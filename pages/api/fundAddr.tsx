// FILEPATH: /pages/api/fundAddr.tsx

import { pool } from './config'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { privyuuid, approveAmt, srcAddr, currency } = req.body

	if (!privyuuid || !approveAmt || !srcAddr || !currency) {
		return res.status(400).json({ error: 'Missing fields' })
	}

	try {
		// @dev todo: check if srcAddr is already linked to privyuuid, update that
		await pool.query(
			'INSERT INTO fundingsrc (approveamt, srcaddr, privyuuid) VALUES ($1, $2, $3, $4)',
			[approveAmt, srcAddr, privyuuid, currency]
		)
		return res.status(200)
	} catch (error) {
		return res.status(500).json({ error: 'Failed to create fund connection' })
	}
}
