// // FILEPATH: /pages/api/spend/createFundConnection.tsx

// import { pool } from '../config'
// import { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse
// ) {
// 	const privyuuid = req.body.privyuuid

// 	if (!privyuuid) {
// 		return res.status(400).json({ error: 'PrivyUUID is required' })
// 	}

// 	const connectionCode = Math.floor(100000 + Math.random() * 900000)

// 	try {
// 		await pool.query(
// 			'INSERT INTO "Fund Connection" (connection_code, privyuuid) VALUES ($1, $2)',
// 			[connectionCode, privyuuid]
// 		)
// 		return res.status(200).json({ connectionCode })
// 	} catch (error) {
// 		return res.status(500).json({ error: 'Failed to create fund connection' })
// 	}
// }
