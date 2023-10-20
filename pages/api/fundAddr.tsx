// FILEPATH: /pages/api/fundAddr.tsx

import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const {
			privy_uuid,
			approveAmt,
			srcAddr,
			currency,
			txhash,
			setDefault,
			prevDefault,
		} = req.body
		// Set default funding source
		if (setDefault && srcAddr && privy_uuid && currency) {
			try {
				await prisma.fundingsrc.update({
					where: {
						privyuuid_srcaddr_currency: {
							privyuuid: privy_uuid,
							srcaddr: srcAddr,
							currency: currency,
						},
					},
					data: { preferred: true },
				})
			} catch (error) {
				return res
					.status(500)
					.json({ error: 'Failed to update default funding source' })
			}
			if (prevDefault) {
				try {
					await prisma.fundingsrc.update({
						where: {
							privyuuid_srcaddr_currency: {
								privyuuid: privy_uuid,
								srcaddr: srcAddr,
								currency: currency,
							},
						},
						data: { preferred: false },
					})
				} catch (error) {
					return res
						.status(500)
						.json({ error: 'Failed to update default funding source' })
				}
			}
		}

		if (!privy_uuid || !approveAmt || !srcAddr || !currency || !txhash) {
			return res.status(400).json({ error: 'Missing fields' })
		}

		try {
			let setDefault = false
			// Check if funding source for currency and uuid exists
			const result = await prisma.fundingsrc.findFirst({
				where: {
					privyuuid: privy_uuid,
					currency: currency,
					preferred: true,
				},
			})
			// No defaults available
			if (!result) setDefault = true

			// Upsert inserts address if it doesn't exist, otherwise updates it
			await prisma.fundingsrc.upsert({
				where: {
					privyuuid_srcaddr_currency: {
						privyuuid: privy_uuid,
						srcaddr: srcAddr,
						currency: currency,
					},
				},
				create: {
					srcaddr: srcAddr,
					currency: currency,
					approveamt: approveAmt,
					preferred: setDefault,
				},
				update: {
					srcaddr: srcAddr,
					currency: currency,
					approveamt: approveAmt,
					preferred: setDefault,
				},
			})

			// insert into usertxs
			await prisma.usertxs.create({
				data: {
					txhash: txhash,
					privyuuid: privy_uuid,
					amount: 0,
					type: 'fund',
					description: 'Funded from external source',
					currency: currency,
					time: new Date(),
				},
			})

			return res.status(200)
		} catch (error) {
			return res.status(500).json({ error: 'Failed to create fund connection' })
		}
	} else if (req.method === 'GET') {
		const { privy_uuid, currency } = req.query
		if (
			!privy_uuid ||
			!currency ||
			typeof privy_uuid !== 'string' ||
			typeof currency !== 'number'
		) {
			return res.status(400).json({ error: 'Missing privyuuid or currency' })
		}
		try {
			const fundingsrcs = await prisma.fundingsrc.findMany({
				where: { privyuuid: privy_uuid, currency: currency },
			})
			return res.status(200).json(fundingsrcs)
		} catch (error) {
			return res.status(500).json({ error: 'Failed to fetch fund connections' })
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' })
	}
}
