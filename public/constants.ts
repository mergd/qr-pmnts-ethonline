import { Address } from 'viem'

export const PMNTS_ADDRESS =
	'0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address

export const CURRENCIES = [
	{
		name: 'USD',
		symbol: '$',
		address: '0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address,
		decimals: 18,
		icon: 'usdc.png',
	},
	{
		name: 'Ethereum',
		symbol: 'WETH',
		address: '0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address,
		decimals: 18,
		icon: 'ethereum.png',
	},
	{
		name: 'Apecoin',
		symbol: 'APE',
		address: '0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address,
		decimals: 18,
		icon: 'apecoin.png',
	},
	{
		name: 'Savings DAI',
		symbol: 'sDAI',
		address: '0x5c90c2f1022f8c67ed5b162c2754ce8da9a66e3a' as Address,
		decimals: 18,
		icon: 'sdai.png',
	},
]
