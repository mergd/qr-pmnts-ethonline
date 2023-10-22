import { Address } from 'viem'

export const PMNTS_ADDRESS =
	'0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address

export const deployerAddr =
	'0x5B61cE87191064291B2a46376d4787AB6Fe24d65' as Address
	// mock sDAI (erc4626): 0xa150252609441246e96611183de1D51E4a3bef6D
	// mockToken0: 0xca0333ed4939c1e5bc4cee11b96bbce9e92b238e
	// mockToken1: 0xa150252609441246e96611183de1d51e4a3bef6d
	// mockToken2: 0x3AE7888C0ba38F5b8EfCA7ac158c73a7Fb84b752
export const CURRENCIES = [
	{
		id: '1',
		name: 'USD',
		symbol: 'USDC',
		address: '0xca0333ed4939c1e5bc4cee11b96bbce9e92b238e' as Address,
		decimals: 18,
		icon: 'usdc.png',
	},
	{
		id: '2',
		name: 'Ethereum',
		symbol: 'WETH',
		address: '0xa150252609441246e96611183de1d51e4a3bef6d' as Address,
		decimals: 18,
		icon: 'ethereum.png',
	},
	{
		id: '3',
		name: 'Apecoin',
		symbol: 'APE',
		address: '0x3AE7888C0ba38F5b8EfCA7ac158c73a7Fb84b752' as Address,
		decimals: 18,
		icon: 'apecoin.png',
	},
	{
		id: '4',
		name: 'Savings DAI',
		symbol: 'sDAI',
		address: '0xa150252609441246e96611183de1D51E4a3bef6D' as Address,
		decimals: 18,
		icon: 'sdai.png',
	},
]

const addr1 = '0xa150252609441246e96611183de1D51E4a3bef6D' as Address

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
		address: '0xca0333ed4939c1e5bc4cee11b96bbce9e92b238e' as Address,
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
		address: '0xa150252609441246e96611183de1d51e4a3bef6d' as Address,
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
		address: '0x3AE7888C0ba38F5b8EfCA7ac158c73a7Fb84b752' as Address,
	},
]
