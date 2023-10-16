import { Address, createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { Pool } from 'pg'

import { baseGoerli } from 'viem/chains'

export const pool = new Pool({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: 7120,
})

export const account = privateKeyToAccount(process.env.DEPLOYER_KEY as Address)

export const walletClient = createWalletClient({
	account,
	chain: baseGoerli,
	transport: http(process.env.BASE_GOERLI_RPC),
})

export const publicClient = createPublicClient({
	chain: baseGoerli,
	transport: http(process.env.BASE_GOERLI_RPC),
})
