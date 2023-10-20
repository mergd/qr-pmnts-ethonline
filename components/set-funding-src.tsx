import React, { useState, useEffect } from 'react'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { Address, formatEther } from 'viem'
import { usePrivy } from '@privy-io/react-auth'

type Props = {
	handleFundingSource: (fundingSource: number) => void
	currency: number
	setDefault?: boolean
}

type FundingSource = {
	address: Address
	isDefault: boolean
	amount: string // Convert bi to number
}

function SelectFundingSource(props: Props) {
	const { user } = usePrivy()
	const [fundingSources, setFundingSources] = useState<FundingSource[]>([])
	const [requestedFundingSource, setRequestedFundingSource] =
		useState<number>(0)
	// @dev todo track userbalance stored within the pmnts contract

	const checkFundingSources = async () => {
		if (!user) return

		await fetch(
			`/api/fundAddr?privy_uuid=${user.id}&currency=${props.currency}`
		)
			.then((res) => res.json())
			.then((data) => {
				if (!data) {
					console.log('Fetch result is null')
					return
				}
				let fundingSourceArr: FundingSource[] = data.map((source: any) => ({
					address: source.address,
					isDefault: source.isDefault,
					amount: formatEther(source.amount),
				}))
				// Sort array, set Default funding source to first element
				fundingSourceArr = fundingSourceArr.sort((a, b) => {
					if (a.isDefault) return -1
					if (b.isDefault) return 1
					return 0
				})
				setFundingSources(fundingSourceArr)
			})
	}
	// Set new default funding source
	const handleSetDefault = async () => {
		if (!user) return
		await fetch(`/api/fundAddr`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				privyuuid: user.id,
				address: fundingSources[requestedFundingSource].address,
				isDefault: true,
				prevSrcDefault: fundingSources[0].address,
			}),
		})
	}

	useEffect(() => {
		checkFundingSources()
	}, [fundingSources])

	const fundingSrcList = (
		<Select
			onValueChange={(e) => {
				setRequestedFundingSource(parseInt(e))
			}}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder={` ${fundingSources[0]}`} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Funding Source</SelectLabel>
					{fundingSources.map((fundingSource, index) => (
						<SelectItem key={index} value={index.toString()}>
							{' '}
							{fundingSource.address.substring(3, 7)}{' '}
							{props.setDefault && (
								<p onClick={handleSetDefault}>Set Default?</p>
							)}{' '}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)

	return (
		<>
			{fundingSources.length > 0 ? (
				fundingSrcList
			) : (
				<div className='rounded-md border border-red-100 px-2 py-2 text-slate-700'>
					No funding Sources found for this currency
				</div>
			)}
		</>
	)
}

export default SelectFundingSource
