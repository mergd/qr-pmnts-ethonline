// FILEPATH: /pages/api/getAddr.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { pool, walletClient, publicClient } from './config'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const privyuuid = req.body.privyuuid

	if (!privyuuid) {
		return res.status(400).json({ error: 'UUID is required' })
	}

	try {
		const result = await pool.query(
			'SELECT useraddr, contractuuid FROM usertable WHERE privyuuid = $1',
			[privyuuid]
		)
		if (result.rows.length === 0) {
			return res.status(500).json({ error: 'No data found for this privyuuid' })
		}
		return res.status(200).json(result.rows[0])
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch data' })
	}
}
