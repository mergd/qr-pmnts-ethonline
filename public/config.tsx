import {
	Address,
	createWalletClient,
	createPublicClient,
	http,
	Hex,
} from 'viem'
import { privateKeyToAccount } from 'viem/accounts'

import { baseGoerli } from 'viem/chains'

// export const account = privateKeyToAccount(process.env.DEPLOYER_PK as Hex)

// export const walletClient = createWalletClient({
// 	account,
// 	chain: baseGoerli,
// 	transport: http('https://goerli.base.org'),
// })

export const publicClient = createPublicClient({
	chain: baseGoerli,
	transport: http('https://goerli.base.org'),
})
