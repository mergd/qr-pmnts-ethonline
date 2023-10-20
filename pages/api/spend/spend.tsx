// FILEPATH: /pages/api/spend.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { walletClient, publicClient } from '../config'
import prisma from '@/lib/prisma'
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
		const res0 = await prisma.usertable.findUnique({
			where: {
				privyuuid: requesterPrivyuuid,
			},
		})
		if (!res0 || !res0.contractuuid)
			return res.status(404).json({ error: 'No user found for this uuid' })

		const { request } = await publicClient.simulateContract({
			address: PMNTS_ADDRESS,
			abi: pmntsABI,
			functionName: 'send',
			args: [
				BigInt(res0.contractuuid),
				// If recipientuuid is not provided, use recipientAddr
				recipientuuid ? recipientuuid : recipientAddr,
				CURRENCIES[currency].address,
				amt,
				srcAddr,
			],
		})

		const hash = await walletClient.sendTransaction(request)
		// Commit this to usertxs db

		return res.status(200)
	} catch (error) {
		return res.status(500).json({ error: 'Failed to call contract function' })
	}
}
