import { Address } from 'viem'

export const PMNTS_ADDRESS =
	'0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address

export const deployerAddr =
	'0x5B61cE87191064291B2a46376d4787AB6Fe24d65' as Address

export const CURRENCIES = [
	{
		id: '1',
		name: 'USD',
		symbol: 'USDC',
		address: '0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address,
		decimals: 18,
		icon: 'usdc.png',
	},
	{
		id: '2',
		name: 'Ethereum',
		symbol: 'WETH',
		address: '0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address,
		decimals: 18,
		icon: 'ethereum.png',
	},
	{
		id: '3',
		name: 'Apecoin',
		symbol: 'APE',
		address: '0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address,
		decimals: 18,
		icon: 'apecoin.png',
	},
	{
		id: '4',
		name: 'Savings DAI',
		symbol: 'sDAI',
		address: '0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address,
		decimals: 18,
		icon: 'sdai.png',
	},
]

const addr1 = '0x000000000000000000000001' as Address

export const YieldData = [
	{
		id: 1,
		name: 'USD',
		currency_id: 0,
		apy: '5.00%',
		balance: '0.00',
		priceUSD: '1.00',
		icon: 'usdc.png',
		description: 'Backed by US Dollars in a bank account.',
		yields: [
			{
				yield_id: 0,
				name: 'Maker - DSR',
				apy: '5.00%',
				deposited: '0.00',
				chain: 'Mantle',
				yieldAddress: addr1,
			},
			{
				yield_id: 1,
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
		id: 2,
		name: 'WETH',
		currency_id: 1,
		apy: '10.00%',
		balance: '0.00',
		priceUSD: '1653.00',
		icon: 'ethereum.png',
		description:
			'Backed by Ethereum in a bank account.  Please note Uniswap yield strategies incur a 0.1% withdraw fee.',
		yields: [
			{
				yield_id: 0,

				name: 'WETH-STETH LP - Uniswap',
				apy: '10.00%',
				deposited: '0.00',
				chain: 'Scroll',
				yieldAddress: addr1,
			},
			{
				yield_id: 1,

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
		currency_id: 2,
		apy: '30.00%',
		balance: '0.00',
		priceUSD: '1.02',
		icon: 'apecoin.png',
		description:
			'Backed by APEs in a jungle and on Twitter, the premier currency of the metaverse.',
		yields: [
			{
				yield_id: 0,

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
