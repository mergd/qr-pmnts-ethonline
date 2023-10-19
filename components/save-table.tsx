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
				<AccordionItem value={data.id.toString()}>
					<AccordionTrigger>
						<div className='flex flex-row gap-1 justify-between items-center'>
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
						<hr className='mt-1 mb-2' />
						{data.yields.map((yieldData, yieldIdx) => (
							<div
								className={`flex flex-row gap-0 justify-between`}
								id={yieldIdx.toString()}
								onClick={() => {
									setSelectedId(data.yields[yieldIdx].yield_id + data.id)
									Props.handleSelected(
										data.yields[yieldIdx].yieldAddress,
										currencyIdx,
										yieldIdx
									)
								}}
							>
								<div
									className={`${
										selectedId === data.yields[yieldIdx].yield_id + data.id
											? 'text-slate-100 bg-blue-700 rounded-md px-1'
											: ''
									}`}
								>
									{yieldData.name}
								</div>
								<span className='justify-end !important'>
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
