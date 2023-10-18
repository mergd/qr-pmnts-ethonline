// FILEPATH: /pages/api/connection/get.tsx

import { NextApiRequest, NextApiResponse } from 'next'
import { pool } from '../config'
// import { Pool } from 'pg'

// export const pool = new Pool({
// 	connectionString:
// 		'postgresql://postgres:Nr8K4RyPSMnH39ELDGzw@containers-us-west-147.railway.app:7120/railway',
// })

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// const connectionCode = req.query.connectionCode
	const connectionCode = '891329'
	// if (!connectionCode) {
	// 	return res.status(400).json({ error: 'Connection code is required' })
	// }

	// if (
	// 	parseInt(connectionCode as string) < 100000 ||
	// 	parseInt(connectionCode as string) > 999999
	// ) {
	// 	return res
	// 		.status(400)
	// 		.json({ error: 'Connection code must be a 6 digit number' })
	// }

	try {
		// const result0 = await pool.query(
		// 	'SELECT privy_uuid FROM fundconnection WHERE connection_code = $1',
		// 	[connectionCode]
		// )
		return res.status(200).json({
			privyuuid: 'result0.rows[0].privyuuid',
			useraddr: 0x000000000000000000000169,
		})
		// if (result0.rows.length === 0) {
		// 	return res
		// 		.status(404)
		// 		.json({ error: 'No fund connection found for this connection code' })
		// }

		// const result1 = await pool.query(
		// 	'SELECT useraddr FROM usertable WHERE privyuuid = $1',
		// 	[result0.rows[0].privyuuid]
		// )
		// if (result1.rows.length === 0) {
		// 	return res.status(404).json({ error: 'No user addr found' })
		// }

		// return res.status(200).json({
		// 	privyuuid: result0.rows[0].privyuuid,
		// 	useraddr: result1.rows[0].useraddr,
		// })
	} catch (error) {
		return res.status(500).json({ error: 'Failed to fetch privyuuid' })
	}
}
