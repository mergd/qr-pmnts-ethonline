// FILEPATH: /pages/api/getFundAddr.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { pool, walletClient, publicClient } from './config'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	let { privyuuid, currency } = req.body

	if (!privyuuid) {
		return res.status(400).json({ error: 'Address and UUID are required' })
	}

	if (!currency) {
		currency = 1 // USD
	}

	try {
		const result = await pool.query(
			'SELECT useraddr, contractuuid, currency FROM fundingsrc WHERE privyuuid = $1 AND currency = $2',
			[privyuuid, currency]
		)
		if (result.rows.length === 0) {
			return res.status(500).json({ error: 'No data found for this privyuuid' })
		}
		return res.status(200).json(result.rows)
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch data' })
	}
}
