// FILEPATH: /pages/api/create.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { pool, walletClient, publicClient } from './config'
import pmntsABI from 'public/pmntsABI'
import { PMNTS_ADDRESS } from '@/public/constants'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { address, uuid } = req.body

	if (!address || !uuid) {
		return res.status(400).json({ error: 'Address and UUID are required' })
	}

	try {
		const { request, result } = await publicClient.simulateContract({
			address: PMNTS_ADDRESS,
			abi: pmntsABI,
			functionName: 'create',
			args: [address],
		})

		await walletClient.sendTransaction(request)
		const returnedString = result.toString()

		await pool.query(
			'INSERT INTO usertable(privyuuid, useraddr, contractuuid) VALUES ($1, $2, $3)',
			[uuid, address, returnedString]
		)

		return res.status(200).json({ returnedString })
	} catch (error) {
		return res.status(500).json({ error: 'Failed to call contract function' })
	}
}
