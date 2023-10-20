// FILEPATH: /pages/api/create.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { walletClient, publicClient } from './config'
import pmntsABI from 'public/pmntsABI'
import { PMNTS_ADDRESS } from '@/public/constants'
import prisma from '@/lib/prisma'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { address, privyuuid } = req.body

		if (!address || !privyuuid) {
			return res
				.status(400)
				.json({ error: 'Address and PRIVYUUID are required' })
		}

		try {
			const { request, result } = await publicClient.simulateContract({
				address: PMNTS_ADDRESS,
				abi: pmntsABI,
				functionName: 'create',
				args: [address],
			})

			const response = await walletClient.sendTransaction(request)
			const returnedString = result.toString()

			await prisma.usertable.create({
				data: {
					privyuuid: privyuuid,
					useraddr: address,
					contractuuid: returnedString,
				},
			})
			// Log creation tx
			await prisma.usertxs.create({
				data: {
					txhash: response,
					privyuuid: privyuuid,
					amount: 0,
					currency: 0,
					time: new Date(),
				},
			})

			return res.status(200).json({ response })
		} catch (error) {
			return res.status(500).json({ error: 'Failed to call contract function' })
		}
	} else if (req.method === 'GET') {
		const { userPrivyUUID } = req.query
		if (!userPrivyUUID || typeof userPrivyUUID !== 'string') {
			return res.status(400).json({ error: 'User PrivyUUID is required' })
		}

		try {
			const result = await prisma.usertable.findFirst({
				where: {
					privyuuid: userPrivyUUID,
				},
			})

			if (!result) {
				return res.status(404).json({ error: 'User not found' })
			}

			return res
				.status(200)
				.json({ userAddr: result.useraddr, contractUUID: result.contractuuid })
		} catch (error) {
			return res.status(500).json({ error: 'Failed to call contract function' })
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' })
	}
}
