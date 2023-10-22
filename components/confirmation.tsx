import React, { useState, useRef, useEffect } from 'react'
import { useZxing } from 'react-zxing'
import CheckNative from './hooks/check-native-bal'
import SelectFundingSource from './set-funding-src'
import SelectCurrency from './select-currency'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog'
import { SendHorizonal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import {
	Address,
	createWalletClient,
	custom,
	isAddress,
	parseEther,
} from 'viem'
import { baseGoerli } from 'viem/chains'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { PMNTS_ADDRESS, CURRENCIES, deployerAddr } from '@/public/constants'
import pmntsABI from '@/public/pmntsABI'
import { publicClient } from '@/public/config'
import { Input } from './ui/input'
import { Label } from './ui/label'
type Props = {
	recipient: bigint
	pmntCode?: string
	amount?: number
	currency?: number
}
const ConfirmTransaction = (props: Props) => {
	const { toast } = useToast()
	const { wallets } = useWallets()
	const { user, sendTransaction } = usePrivy()
	const [recipient, setRecipient] = useState(props.recipient)
	const [amount, setAmount] = useState(props.amount)
	const [fundingSource, setFundingSource] = useState<number>(0)
	const [currency, setCurrency] = useState(props.currency)

	const embeddedWallet = wallets.find(
		(wallet) => wallet.walletClientType === 'privy'
	)

	const handleTransfer = async () => {
		// Check if userBalance ether balance is gt 0

		// If self serve is true, cannot make tx on user behalf. Pull up privy modal for txs.
		const selfServe = CheckNative()
		if (!selfServe) {
			// if (amount < 10) {
			// 	// Spend without confirmation
			// 	await fetch('/api/spend', {
			// 		method: 'POST',
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 		},
			// 		body: JSON.stringify({
			// 			privyId,
			// 			amount,
			// 			currency,
			// 		}),
			// 	}).catch((err: any) => console.log(err))
			// } else {
			// }
		} else {
		}
		// Update pmnt request db
		if (props.pmntCode) {
			await fetch('/api/request', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					payId: props.pmntCode,
					txHash: '',
				}),
			})
		}
	}

	const onTransfer = async (
		amount: number,
		currency: number,
		recipUuid?: string,
		recipAddr?: Address
	) => {
		if (!embeddedWallet || !user) return
		try {
			await embeddedWallet.switchChain(baseGoerli.id)
			// Get an EIP1193 provider from the embedded wallet
			const provider = await embeddedWallet.getEthereumProvider()
			// From the EIP1193 provider, create a viem wallet client
			const walletClient = createWalletClient({
				account: embeddedWallet.address as `0x${string}`,
				chain: baseGoerli,
				transport: custom(provider),
			})
			const curryAddr = CURRENCIES[currency]
			let recipContractUuid
			let senderContractUuid
			// query contract user uuid
			if (!recipAddr && recipUuid) {
				const res = await fetch(`/api/create/userPrivyUUID=${recipUuid}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then((result) => {
						return result.json()
					})
					.catch((err: any) => console.log(err))
				recipContractUuid = res.body.contractUUID as bigint
			}

			const res = await fetch(`/api/create/userPrivyUUID=${user.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((result) => {
					return result.json()
				})
				.catch((err: any) => console.log(err))
			recipContractUuid = res.body.contractUUID as bigint

			const recipient = recipContractUuid ? recipContractUuid : recipAddr
			if (!recipient) return

			let txhash
			const { request, result } = await publicClient.simulateContract({
				address: PMNTS_ADDRESS,
				abi: pmntsABI,
				functionName: 'send',
				args: [
					BigInt(recipContractUuid),
					recipient as bigint,
					curryAddr.address,
					parseEther(amount.toString()),
					curryAddr.address,
				],
				account: embeddedWallet.address as Address,
			})
			if (amount < 10) {
				// Confirm tx in background if it is less than 10
			}
		} catch (err) {
			console.log(err)
			toast({
				title: 'Transaction failed',
				description: 'Please try again later.',
				variant: 'destructive',
			})
		}
	}

	// const paymentRequest = (
	// 	<div>
	// 			<p>
	// 					Are you sure you want to send {props.amount}{' '}
	// 					{CURRENCIES[currency].name} to the recipient?
	// 				</p>
	// 				<div className='mt-4'>
	// 					<SelectFundingSource
	// 						currency={currency}
	// 						handleFundingSource={setFundingSource}
	// 					/>
	// 				</div>
	// 	</div>
	// )

	const setPayandCurrency = (
		<div>
			<SelectCurrency handleCurrency={setCurrency} />
			{props.currency && (
				<Label htmlFor={'inputAmt'}>
					Amount of {CURRENCIES[props.currency].symbol}{' '}
				</Label>
			)}
			<Input
				id='inputAmt'
				onChange={(e) => setAmount(parseInt(e.target.value))}
				className='mt-4 px-2'
			/>
		</div>
	)

	const paymentRequest = (
		<p>
			Are you sure you want to send {props.amount}{' '}
			{props.currency ? CURRENCIES[props.currency].name : ''} to the recipient?
		</p>
	)

	const setPayAmount = (
		<div>
			{props.currency && (
				<Label htmlFor={'inputAmt'}>
					Amount of {CURRENCIES[props.currency].symbol}{' '}
				</Label>
			)}
			<Input
				id='inputAmt'
				onChange={(e) => setAmount(parseInt(e.target.value))}
			/>
		</div>
	)

	const showPaymentRequest = () => {
		if (!props.currency) {
			return setPayandCurrency
		} else if (!props.amount || props.amount === 0) {
			return setPayAmount
		} else {
			return paymentRequest
		}
	}
	return (
		<DialogContent className='bg-zinc-100'>
			<DialogHeader>
				<SendHorizonal className='h-14 w-14 text-slate-700' />
				<DialogTitle className='flex flex-row justify-between'>
					<p className='font-semibold text-slate-700'>Confirm Transaction</p>
				</DialogTitle>
				<DialogDescription>
					<div className='flex flex-col gap-3'>
						{showPaymentRequest()}

						<div>
							{currency && (
								<SelectFundingSource
									currency={currency}
									handleFundingSource={setFundingSource}
								/>
							)}
						</div>
					</div>
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<Button
					className={`bg-blue-500 text-white ${
						amount && currency ? '' : 'disabled'
					}`}
					type='submit'
				>
					Confirm
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
export default ConfirmTransaction
