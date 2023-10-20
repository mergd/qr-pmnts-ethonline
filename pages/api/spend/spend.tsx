// FILEPATH: /pages/api/spend.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { walletClient, publicClient } from '../config'
import prisma from '@/lib/prisma'
import pmntsABI from 'public/pmntsABI'
import { CURRENCIES, deployerAddr, PMNTS_ADDRESS } from '@/public/constants'
import ERC20ABI from '@/public/ERC20ABI'
import ERC4626ABI from '@/public/ERC4626ABI'
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// recipientuuid should be the privyUuid
	const {
		requesterPrivyuuid,
		srcAddr,
		recipientuuid,
		currency,
		amt,
		vaultAddr,
	} = req.body

	let { recipientAddr } = req.body

	if (!requesterPrivyuuid || !srcAddr || !currency || !amt) {
		return res.status(400).json({ error: 'Missing fields' })
	}

	if (vaultAddr) recipientAddr = deployerAddr

	try {
		const res0 = await prisma.usertable.findUnique({
			where: {
				privyuuid: requesterPrivyuuid,
			},
		})
		if (!res0 || !res0.contractuuid)
			return res.status(404).json({ error: 'No user found for this uuid' })

		const { request: req0 } = await publicClient.simulateContract({
			address: PMNTS_ADDRESS,
			abi: pmntsABI,
			functionName: 'send',
			args: [
				BigInt(res0.contractuuid),
				// If recipientuuid is not provided, use recipientAddr
				recipientuuid ? recipientuuid : recipientAddr,
				CURRENCIES[currency].address,
				amt,
				srcAddr,
			],
		})

		const hash0 = await walletClient.sendTransaction(req0)
		// Commit this to usertxs db

		if (vaultAddr) {
			// Approve tx
			const { request: req1 } = await publicClient.simulateContract({
				address: CURRENCIES[currency].address,
				abi: ERC20ABI,
				functionName: 'approve',
				args: [vaultAddr, BigInt(amt)],
			})
			const hash1 = await walletClient.sendTransaction(req1)
			// Deposit tx
			const { request: req2, result: outputShares } =
				await publicClient.simulateContract({
					address: vaultAddr,
					abi: ERC4626ABI,
					functionName: 'deposit',
					args: [BigInt(amt), deployerAddr],
				})
			const hash2 = await walletClient.sendTransaction(req2)
			// Credit user with output shares in pmnts contract
			const { request: req3 } = await publicClient.simulateContract({
				address: PMNTS_ADDRESS,
				abi: pmntsABI,
				functionName: 'deposit',
				args: [BigInt(res0.contractuuid), vaultAddr, outputShares],
			})
			const hash3 = await walletClient.sendTransaction(req3)
			// Commit this to usertxs db
		}

		return res.status(200)
	} catch (error) {
		return res.status(500).json({ error: 'Failed to call contract function' })
	}
}
