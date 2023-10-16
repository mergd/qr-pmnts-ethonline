import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

import { Address, zeroAddress } from 'viem'

import React, { useState } from 'react'

import Image from 'next/image'

const addr1 = '0x000000000000000000000001' as Address
const YieldData = [
	{
		id: '1',
		name: 'USD',
		apy: '5.00%',
		balance: '0.00',
		priceUSD: '1.00',
		icon: 'usdc.png',
		description: 'Backed by US Dollars in a bank account.',
		yields: [
			{
				yield_id: '1',
				name: 'Maker - DSR',
				apy: '5.00%',
				deposited: '0.00',
				chain: 'Mantle',
				yieldAddress: addr1,
			},
			{
				yield_id: '2',

				name: 'Compound - cUSDC',
				apy: '3.00%',
				deposited: '0.00',
				chain: 'Scroll',
				yieldAddress: addr1,
			},
		],
		address: addr1,
	},
	{
		id: '2',
		name: 'WETH',
		apy: '10.00%',
		balance: '0.00',
		priceUSD: '1653.00',
		icon: 'ethereum.png',
		description: 'Backed by Ethereum in a bank account.',
		yields: [
			{
				yield_id: '1',

				name: 'WETH-STETH LP - Uniswap',
				apy: '10.00%',
				deposited: '0.00',
				chain: 'Scroll',
				yieldAddress: addr1,
			},
			{
				yield_id: '2',

				name: 'WETH-STETH LP - Uniswap',
				apy: '5.00%',
				deposited: '0.00',
				chain: 'Scroll',
				yieldAddress: addr1,
			},
		],
		address: addr1,
	},
	{
		id: 3,
		name: 'APE',
		apy: '30.00%',
		balance: '0.00',
		priceUSD: '1.02',
		icon: 'apecoin.png',
		description:
			'Backed by APEs in a jungle and on Twitter, the premier currency of the metaverse.',
		yields: [
			{
				yield_id: '1',

				name: 'APE Staking',
				apy: '30.00%',
				deposited: '0.00',
				chain: 'Mantle',
				yieldAddress: addr1,
			},
		],
		address: addr1,
	},
]

type props = {
	handleSelected: (
		yieldAddress: Address,
		underlyingAddress: Address,
		yieldName: string,
		underlyingSymbol: string
	) => void
}

export function SaveTable(Props: props) {
	const [selectedId, setSelectedId] = useState<string | null>(null)

	return (
		<Accordion type='single' collapsible className='w-full'>
			{YieldData.map((data) => (
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
						{data.yields.map((yieldData, index) => (
							<div
								className={`flex flex-row gap-0 justify-between`}
								id={index.toString()}
								onClick={() => {
									setSelectedId(data.yields[index].yield_id + data.id)
									Props.handleSelected(
										data.yields[index].yieldAddress,
										data.address,
										yieldData.name,
										data.name
									)
								}}
							>
								<div
									className={`${
										selectedId === data.yields[index].yield_id + data.id
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
