// FILEPATH: /pages/api/getFundConnection.tsx

import { NextApiRequest, NextApiResponse } from 'next'
import { pool } from './config'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const connectionCode = req.query.connectionCode

	if (!connectionCode) {
		return res.status(400).json({ error: 'Connection code is required' })
	}

	if (
		parseInt(connectionCode as string) < 100000 ||
		parseInt(connectionCode as string) > 999999
	) {
		return res
			.status(400)
			.json({ error: 'Connection code must be a 6 digit number' })
	}

	try {
		const result0 = await pool.query(
			'SELECT privyuuid FROM "Fund Connection" WHERE connection_code = $1',
			[connectionCode]
		)

		if (result0.rows.length === 0) {
			return res
				.status(404)
				.json({ error: 'No fund connection found for this connection code' })
		}

		const result1 = await pool.query(
			'SELECT useraddr FROM usertable WHERE privyuuid = $1',
			[result0.rows[0].privyuuid]
		)

		return res
			.status(200)
			.json({
				privyuuid: result0.rows[0].privyuuid,
				useraddr: result1.rows[0].useraddr,
			})
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch privyuuid' })
	}
}
