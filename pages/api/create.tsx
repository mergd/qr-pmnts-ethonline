// FILEPATH: /pages/api/create.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { publicClient } from '../../public/config'
import pmntsABI from 'public/pmntsABI'
import { Hex, createWalletClient, http, zeroAddress } from 'viem'
import { baseGoerli } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { PMNTS_ADDRESS } from '@/public/constants'
import prisma from '@/lib/prisma'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const account = privateKeyToAccount(process.env.DEPLOYER_PK as Hex)

		const walletClient = createWalletClient({
			account,
			chain: baseGoerli,
			transport: http(),
		})
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

			const response = await walletClient.writeContract(request)
			const returnedString = result.toString()

			await prisma.usertable.create({
				data: {
					privyuuid: privyuuid,
					useraddr: address,
					contractuuid: returnedString,
				},
			})
			// Log creation tx

			try {
				await prisma.usertxs.create({
					data: {
						txhash: response,
						privyuuid: privyuuid,
						time: new Date(),
						type: 'CREATE',
						description: 'Account Creation',
					},
				})
			} catch (e) {
				console.log(e)
			}

			try {
				await prisma.userPoints.create({
					data: {
						privy_uuid: privyuuid,
						points: 50,
					},
				})
			} catch (e) {
				console.log(e)
			}

			return res.status(200).json({ response })
		} catch (error) {
			return res.status(500).json({ error })
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
			return res.status(500).json({ error: 'Failed to retrieve user info' })
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' })
	}
}
