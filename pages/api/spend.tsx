// FILEPATH: /pages/api/spend.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { pool, walletClient, publicClient } from './config'
import pmntsABI from 'public/pmntsABI'
import { PMNTS_ADDRESS } from '@/public/constants'
import { CURRENCIES } from '@/public/constants'
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// recipientuuid should be the contractuuid
	const {
		requesterPrivyuuid,
		srcAddr,
		recipientAddr,
		recipientuuid,
		currency,
		amt,
	} = req.body

	if (
		!requesterPrivyuuid ||
		!srcAddr ||
		!recipientAddr ||
		!recipientuuid ||
		!currency ||
		!amt
	) {
		return res.status(400).json({ error: 'Missing fields' })
	}

	try {
		const res0 = await pool.query(
			'SELECT useraddr, contractuuid FROM usertable WHERE privyuuid = $1',
			[requesterPrivyuuid]
		)
		const contractUuid = res0.rows[0].contractuuid

		if (recipientuuid) {
			// p2p transfer
			let { request } = await publicClient.simulateContract({
				address: PMNTS_ADDRESS,
				abi: pmntsABI,
				functionName: 'send',
				args: [
					contractUuid,
					recipientuuid,
					CURRENCIES[currency].address,
					amt,
					srcAddr,
				],
			})
		} else {
			// Normal spend
			let { request } = await publicClient.simulateContract({
				address: PMNTS_ADDRESS,
				abi: pmntsABI,
				functionName: 'send',
				args: [
					contractUuid,
					recipientuuid,
					CURRENCIES[currency].address,
					amt,
					srcAddr,
				],
			})
		}
		await walletClient.sendTransaction(request)

		await pool.query(
			'INSERT INTO usertable(privyuuid, useraddr, contractuuid) VALUES ($1, $2, $3)',
			[uuid, address, returnedString]
		)

		return res.status(200)
	} catch (error) {
		return res.status(500).json({ error: 'Failed to call contract function' })
	}
}
