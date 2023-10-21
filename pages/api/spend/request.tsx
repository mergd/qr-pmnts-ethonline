// FILEPATH: /pages/api/spend/createFundConnection.tsx

// import { pool } from '../config'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { privyuuid, currency, spendamt, description, payId, txhash } =
			req.body
		// Fulfill Payment Request
		if (payId && txhash) {
			try {
				await prisma.connectiondata.update({
					where: {
						id: payId,
					},
					data: {
						fulfilled: true,
						txhash: txhash,
					},
				})
				return res.status(200)
			} catch (error) {
				return res.status(500).json({ error: 'Failed to create fulfill' })
			}
		} else {
			// Make Payment Request
			if (!privyuuid) {
				return res.status(400).json({ error: 'PrivyUUID is required' })
			}

			try {
				const response = await prisma.connectiondata.create({
					data: {
						privyuuid: privyuuid, // merchant privuuid
						amount: spendamt,
						currency: currency,
						description: description,
					},
				})
				return res.status(200).json({ code: response.id })
			} catch (error) {
				return res
					.status(500)
					.json({ error: 'Failed to create fund connection' })
			}
		}
	} else if (req.method === 'GET') {
		// Get data on the payId
		const { id } = req.query
		const payId = id as string

		if (!payId) return res.status(400).json({ error: 'PayID is required' })

		try {
			const response = await prisma.connectiondata.findFirst({
				where: {
					id: payId,
				},
			})
			return res.status(200).json({ response })
		} catch (error) {
			console.log('Error', error)
		}
	} else if (req.method === 'OPTIONS') {
		// Handle OPTIONS request to set up SSE
		// Returns an event if the payment request is fulfilled
		const { id } = req.query
		const payId = id as string
		const response = await prisma.connectiondata
			.findFirstOrThrow({
				where: {
					id: payId,
				},
			})
			.catch((error) => {
				// End Stream if no payment request found
				res.status(404).json({ error: 'Payment request not found' })
				res.end()
			})

		res.setHeader('Content-Type', 'text/event-stream')
		res.setHeader('Cache-Control', 'no-cache')
		res.setHeader('Connection', 'keep-alive')
		res.flushHeaders()

		// Send an event when the 'fulfilled' value becomes true
		const intervalId = setInterval(async () => {
			const result = await prisma.connectiondata.findFirstOrThrow({
				where: {
					id: payId,
				},
			})
			if (result.fulfilled) {
				res.write(`data: ${JSON.stringify({ fulfilled: true })}\n\n`)
				clearInterval(intervalId)
				res.end()
			}
		}, 1000)

		// Stop sending events if client disconnects
		req.on('close', () => {
			clearInterval(intervalId)
			res.end()
		})
	} else {
		res.status(405).json({ error: 'Method not allowed' })
	}
}
