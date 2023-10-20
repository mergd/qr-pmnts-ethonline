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
import { Label } from '@/components/ui/label'
import { Address, formatEther } from 'viem'
import { usePrivy } from '@privy-io/react-auth'

type Props = {
	handleFundingSource: (fundingSource: number) => void
	currency: number
}

type FundingSource = {
	id: number
	address: Address
	isDefault: boolean
	amount: string // Convert bi to number
}

function SelectFundingSource(props: Props) {
	const { user } = usePrivy()
	const [fundingSources, setFundingSources] = useState<FundingSource[]>([])
	const checkFundingSources = async () => {
		if (!user) return
		const sources = await fetch(
			`/api/fundAddr?privyuuid=${user.id}&currency=${props.currency}`
		)
			.then((res) => res.json())
			.then((data) => {
				let fundingSourceArr: FundingSource[] = []
				for (const source of data) {
					fundingSourceArr.push({
						id: source.id,
						address: source.address,
						isDefault: source.isDefault,
						amount: formatEther(source.amount),
					})
				}
				// Sort array, set Default funding source to first element
				fundingSourceArr = fundingSourceArr.sort((a, b) => {
					if (a.isDefault) return -1
					if (b.isDefault) return 1
					return 0
				})
				setFundingSources(fundingSourceArr)
			})
	}

	useEffect(() => {
		checkFundingSources()
	}, [])

	return (
		<Select>
			<Label>Funding Source</Label>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder={` ${fundingSources}`} />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Funding Source</SelectLabel>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default SelectFundingSource
