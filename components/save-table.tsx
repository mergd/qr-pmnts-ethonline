import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

import { Address, zeroAddress } from 'viem'

import React, { useState } from 'react'

import Image from 'next/image'

import { YieldData } from 'public/constants'

type props = {
	handleSelected: (
		underlyingAddress: Address,
		currencyId: number,
		yieldId: number
	) => void
}

export function SaveTable(Props: props) {
	const [selectedId, setSelectedId] = useState<string | null>(null)

	return (
		<Accordion type='single' collapsible className='w-full'>
			{YieldData.map((data, currencyIdx) => (
				<AccordionItem key={currencyIdx} value={data.id.toString()}>
					<AccordionTrigger>
						<div className='flex flex-row items-center justify-between gap-1'>
							<Image
								src={`/icons/${data.icon}`}
								width={20}
								height={20}
								alt={data.name}
							/>
							<span className='font-bold'> {data.name} </span>{' '}
							<span className='text-slate-600'> (${data.priceUSD})</span>
							<span className='justify-end text-slate-700'>
								{' '}
								{data.apy} APY{' '}
							</span>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<span className='text-xs font-bold uppercase'>
							{' '}
							Balance: {data.balance}
						</span>
						<br />
						{data.description}
						<br />
						<hr className='mb-2 mt-1' />
						{data.yields.map((yieldData, yieldIdx) => (
							<div
								key={yieldIdx}
								className={`flex flex-row justify-between gap-0`}
								id={yieldIdx.toString()}
								onClick={() => {
									setSelectedId(
										data.id + data.yields[yieldIdx].yield_id.toString()
									)
									Props.handleSelected(
										data.yields[yieldIdx].yieldAddress,
										currencyIdx,
										yieldIdx
									)
								}}
							>
								<div
									className={`${
										selectedId ===
										data.id + data.yields[yieldIdx].yield_id.toString()
											? 'rounded-md bg-blue-700 px-1 text-slate-100'
											: ''
									}`}
								>
									{yieldData.name}
								</div>
								<span className='!important justify-end'>
									{' '}
									{yieldData.apy}{' '}
								</span>
							</div>
						))}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
