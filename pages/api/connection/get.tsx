// FILEPATH: /pages/api/connection/get.tsx

import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@/lib/prisma'

// export const pool = new Pool({
// 	connectionString:
// 		'postgresql://postgres:Nr8K4RyPSMnH39ELDGzw@containers-us-west-147.railway.app:7120/railway',
// })

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const connectionCode = req.body.connectionCode
	if (!connectionCode) {
		return res.status(400).json({ error: 'Connection code is required' })
	}

	try {
		const fundconnection = await prisma.fundconnection.findUnique({
			where: { connection_code: connectionCode },
		})

		if (!fundconnection || !fundconnection.privy_uuid) {
			return res
				.status(404)
				.json({ error: 'No fund connection found for this connection code' })
		}

		const user = await prisma.usertable.findUnique({
			where: { privyuuid: fundconnection.privy_uuid },
		})
		if (!user) {
			return res.status(404).json({ error: 'No user found for this uuid' })
		}

		return res.status(200).json({
			privyuuid: user.privyuuid,
			useraddr: user.useraddr,
		})
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch privyuuid' })
	}
}
