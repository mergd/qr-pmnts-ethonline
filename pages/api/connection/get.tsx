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
			privyuuid: user.privyuuid,
			useraddr: user.useraddr,
		})
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch privyuuid' })
	}
}
