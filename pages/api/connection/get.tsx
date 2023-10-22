// FILEPATH: /pages/api/connection/get.tsx

import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'
import { zeroAddress } from 'viem'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const connectionCode = req.body.connectionCode
	if (!connectionCode) {
		return res.status(500).json({ error: 'Connection code is required' })
	}

	const fundconnection = await prisma.fundconnection
		.findFirst({
			where: { connection_code: connectionCode },
		})
		.catch((err) => {
			return res.status(500).json(err)
		})

	if (!fundconnection) {
		return res
			.status(404)
			.json({ error: 'No fund connection found for this connection code' })
	}

	if (!fundconnection || !fundconnection.privy_uuid) {
		return res
			.status(404)
			.json({ error: 'No fund connection found for this connection code' })
	}
	let user
	try {
		user = await prisma.usertable.findFirst({
			where: { privyuuid: fundconnection.privy_uuid },
		})
	} catch (e) {
		return res.status(500).json(e)
	}

	if (!user) return res.status(500).json({ error: 'Something went wrong' })
	return res.status(200).json({
		privyuuid: fundconnection.privy_uuid,
		useraddr: user.useraddr,
	})
}
