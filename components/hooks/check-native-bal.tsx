import { publicClient } from '@/public/config'
import { useWallets } from '@privy-io/react-auth'
import React, { useEffect, useState } from 'react'
import { Address, etherUnits, parseEther } from 'viem'
const CheckNative = () => {
	const ethThreshold = parseEther('0.0001')
	const { wallets } = useWallets()

	const [isSelfServe, setisSelfServe] = useState<boolean>(false)
	const embeddedWallet = wallets.find(
		(wallet) => wallet.walletClientType === 'privy'
	)

	const checkBal = async () => {
		if (embeddedWallet) {
			const balance = await publicClient.getBalance({
				address: embeddedWallet.address as Address,
			})
			if (balance >= ethThreshold) setisSelfServe(true)
		}
	}
	useEffect(() => {
		{
			checkBal
		}
	}, [])
	return isSelfServe
}

export default CheckNative
