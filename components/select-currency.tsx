import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectLabel,
	SelectGroup,
} from '@/components/ui/select'
import Image from 'next/image'
import { CURRENCIES } from '@/public/constants'
import React, { useEffect, useState } from 'react'
type Props = {
	currency?: number
	handleCurrency: (currency: number) => void
}
const SelectCurrency = (props: Props) => {
	const [requestedCurrency, setRequestedCurrency] = useState<number>(
		props.currency ? props.currency : 0
	)

	useEffect(() => {
		props.handleCurrency(requestedCurrency)
	}, [requestedCurrency, props])

	return (
		<Select onValueChange={(e) => setRequestedCurrency(parseInt(e))}>
			<SelectTrigger className='w-[220px]'>
				<SelectValue placeholder={'USD'} />
			</SelectTrigger>
			<SelectContent className='bg-slate-50'>
				<SelectGroup>
					<SelectLabel>Tokens</SelectLabel>
					{CURRENCIES.map((currency, index) => (
						<SelectItem
							key={index}
							value={index.toString()}
							className='no-wrap '
						>
							{' '}
							<div className='flex flex-row items-center gap-1'>
								<Image
									src={`/icons/${currency.icon}`}
									height={20}
									width={20}
									alt='currency'
								/>{' '}
								<span>{currency.name}</span>{' '}
							</div>
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default SelectCurrency
