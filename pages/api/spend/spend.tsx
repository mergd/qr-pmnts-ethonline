// FILEPATH: /pages/api/spend.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { pool, walletClient, publicClient } from '../config'
import pmntsABI from 'public/pmntsABI'
import { PMNTS_ADDRESS } from '@/public/constants'
import { CURRENCIES } from '@/public/constants'
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// recipientuuid should be the privyUuid
	const {
		requesterPrivyuuid,
		srcAddr,
		recipientAddr,
		recipientuuid,
		currency,
		amt,
	} = req.body

	if (!requesterPrivyuuid || !srcAddr || !currency || !amt) {
		return res.status(400).json({ error: 'Missing fields' })
	}

	try {
		const res0 = await pool.query(
			'SELECT useraddr, contractuuid FROM usertable WHERE privyuuid = $1',
			[requesterPrivyuuid]
		)
		const contractUuid = res0.rows[0].contractuuid

		const { request } = await publicClient.simulateContract({
			address: PMNTS_ADDRESS,
			abi: pmntsABI,
			functionName: 'send',
			args: [
				contractUuid,
				// If recipientuuid is not provided, use recipientAddr
				recipientuuid ? recipientuuid : recipientAddr,
				CURRENCIES[currency].address,
				amt,
				srcAddr,
			],
		})

		const hash = await walletClient.sendTransaction(request)

		await pool.query(
			'INSERT INTO usertxs(txhash privyuuid chainid amount currency time) VALUES ($1, $2, $3, $4, $5, $6)',
			[hash, requesterPrivyuuid, 8453, amt, currency, new Date()]
		)

		return res.status(200)
	} catch (error) {
		return res.status(500).json({ error: 'Failed to call contract function' })
	}
}
