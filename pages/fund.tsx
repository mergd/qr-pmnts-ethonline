// React imports
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// Privy imports
import { usePrivy, useWallets } from '@privy-io/react-auth'

// Component imports
import { Label } from '@/components/ui/label'
import { CodeConnect } from '@/components/code-input'
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	SelectLabel,
	SelectGroup,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/components/ui/use-toast'

// Icon imports
import transfer from 'public/icons/mdi_transfer.png'
import { Wallet2, ChevronLeft } from 'lucide-react'

// Utility imports
import { Address, maxUint256, zeroAddress } from 'viem'
import {
	parseEther,
	formatEther,
	createPublicClient,
	createWalletClient,
	custom,
} from 'viem'

// Data imports
import ERC20ABI from '@/public/ERC20ABI'
import pmnts from 'public/pmnts-logo.png'
import { CURRENCIES, PMNTS_ADDRESS } from '@/public/constants'
import { links } from '@/lib/links'

// Chain imports
import {
	baseGoerli,
	mantleTestnet,
	polygonZkEvmTestnet,
	filecoinCalibration,
	sepolia,
	scrollSepolia,
	Chain,
} from 'viem/chains'

const Fund = () => {
	const { toast } = useToast()
	const [retrievedAddr, setRetrievedAddr] = useState<Address>(zeroAddress)
	const [requestedNetwork, setRequestedNetwork] = useState<Chain>(baseGoerli)
	const [requestedCurrency, setRequestedCurrency] = useState<number>(0)
	const [approveAmt, setApproveAmt] = useState<bigint>(BigInt(0))
	const [userPrivyUUID, setUserPrivyUUID] = useState<string>('')
	const [extWalletChainId, setExtWalletChainId] = useState<number>(0)

	const networks = [
		baseGoerli,
		mantleTestnet,
		polygonZkEvmTestnet,
		filecoinCalibration,
		sepolia,
		scrollSepolia,
	]
	const alert = (
		<Alert className=' rounded-md bg-blue-100 p-4 text-blue-700'>
			<Wallet2 className='m h-4 w-4' />
			<AlertTitle className='font-semibold'>No deposits needed</AlertTitle>
			<AlertDescription className='text-sm'>
				You don&apos;t need to deposit anything on pmnts
				<br />
				Simply open approval and they&apos;ll be transferred as you spend them.
			</AlertDescription>
		</Alert>
	)

	const info = (
		<div className='mt-8 flex flex-col justify-center'>
			<h1 className=' text-center font-serif text-xl font-bold text-gray-800'>
				Transfer Helper
			</h1>
			<Image
				src={transfer}
				width={127}
				height={127}
				className='object-contain'
				alt='transfer'
			/>
		</div>
	)

	const header = (
		<div className='flex  justify-start pl-4 pt-4'>
			<Link href={'/'}>
				<Image
					src={pmnts}
					width={100}
					height={30}
					className='object-contain'
					alt='pmnts logo'
				/>
			</Link>
		</div>
	)

	const codeSubmit = async (code: Array<string>) => {
		const concatCode = code.join('')
		console.log(concatCode)
		let response
		try {
			response = await fetch('/api/connection/get', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ connectionCode: code }),
			})
			console.log(response.status)
		} catch (e) {
			console.log()
		}
		if (!response) return

		if (response.status == 200) {
			const json = await response.json()

			setUserPrivyUUID(json.privyuuid)
			setRetrievedAddr(json.useraddr)
		} else {
			toast({
				title: 'The code is invalid, or there was a backend error',
				description: `${response.status}: ${response.statusText}`,
				variant: 'destructive',
			})
		}
	}

	const onFundAddr = async () => {
		const response = await fetch('/api/fundAddr', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				privy_uuid: userPrivyUUID,
				approveAmt: approveAmt,
				srcAddr: externalWallet?.address,
				currency: requestedCurrency,
				txhash: txHash,
			}),
		})
		if (!response.ok) {
			console.log(response.status, response.statusText)
		}
	}

	const connectCard = (
		<Card className='max-w-[400] overflow-hidden rounded-lg shadow-lg'>
			<CardTitle className=' p-4 font-serif'>
				Open Approval for Tokens
			</CardTitle>
			<div className='mx-4 my-2 p-2'>
				{alert}

				<div className='my-2'>
					<CodeConnect handleSubmit={codeSubmit} />
				</div>
			</div>
		</Card>
	)

	const { connectWallet } = usePrivy()
	const { wallets } = useWallets()
	const embeddedWallet = wallets.find(
		(wallet) => wallet.walletClientType === 'privy'
	)

	const externalWallet = wallets.find(
		(wallet) => wallet.walletClientType !== 'privy'
	)
	const [txIsLoading, setTxIsLoading] = useState(false)
	const [txHash, setTxHash] = useState<string | undefined>()

	const onApprove = async () => {
		if (!externalWallet || !embeddedWallet) return
		try {
			// Switch chain to Requested network
			await externalWallet.switchChain(requestedNetwork.id)

			// Build viem wallet client for external wallet
			const provider = await externalWallet.getEthereumProvider()
			const walletClient = createWalletClient({
				account: externalWallet.address as `0x${string}`,
				chain: requestedNetwork,
				transport: custom(provider),
			})

			const publicClient = createPublicClient({
				chain: requestedNetwork,
				transport: custom(provider),
			})

			// Send transaction from external wallet
			setTxIsLoading(true)

			const { request } = await publicClient.simulateContract({
				address: CURRENCIES[requestedCurrency].address,
				abi: ERC20ABI,
				functionName: 'approve',
				args: [PMNTS_ADDRESS, approveAmt],
			})

			const _txHash = await walletClient.sendTransaction(request)

			setTxHash(_txHash)
			// Update backend
			onFundAddr()
		} catch (e) {
			console.error('Transfer failed with error ', e)
		}
		setTxIsLoading(false)
	}

	const onAddNetwork = async () => {
		if (!externalWallet) return
		const provider = await externalWallet.getEthereumProvider()
		await provider.request({
			method: 'wallet_addEthereumChain',
			params: [
				{
					chainId: `0x${requestedNetwork.id.toString(16)}`,
					chainName: requestedNetwork.name,
					nativeCurrency: requestedNetwork.nativeCurrency,
					rpcUrls: [requestedNetwork.rpcUrls.public?.http[0] ?? ''],
					blockExplorerUrls: [
						requestedNetwork.blockExplorers?.default.url ?? '',
					],
				},
			],
		})
	}

	const onDisconnect = async () => {
		if (!externalWallet) return
		await externalWallet.disconnect()
	}

	const chainSelect = (
		<Select onValueChange={(e) => setRequestedNetwork(networks[parseInt(e)])}>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder={`${requestedNetwork.name}`} />
			</SelectTrigger>
			<SelectContent className='bg-slate-50'>
				<SelectGroup>
					<SelectLabel>Chains</SelectLabel>

					{networks.map((network, index) => (
						<SelectItem key={network.id} value={index.toString()}>
							{' '}
							{network.name}{' '}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)

	const currencySelect = (
		<Select onValueChange={(e) => setRequestedCurrency(parseInt(e))}>
			<SelectTrigger className='w-[220px]'>
				<SelectValue placeholder={'USD'} />
			</SelectTrigger>
			<SelectContent className='bg-slate-50'>
				<SelectGroup>
					<SelectLabel>Tokens</SelectLabel>
					{CURRENCIES.map((currency, index) => (
						<SelectItem
							key={index}
							value={index.toString()}
							className='no-wrap flex flex-row items-center gap-1'
						>
							{' '}
							<Image
								src={`/icons/${currency.icon}`}
								height={20}
								width={20}
								className='-mb-2'
								alt='currency icon'
							/>{' '}
							{currency.name}{' '}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)

	const connectAndFund = (
		<div>
			<div className='flex flex-row items-center justify-between'>
				<p
					className={`mt-2 text-sm  ${
						externalWallet ? 'text-gray-400' : 'text-gray-600'
					}`}
				>
					Connect your wallet:
				</p>

				{externalWallet && (
					<p className='text-gray-600' onClick={onDisconnect}>
						{' '}
						Disconnect{' '}
					</p>
				)}
			</div>
			<p className='mt-2 text-sm text-gray-600'></p>
			{!externalWallet && (
				<button
					type='button'
					className='mt-2 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400'
					onClick={connectWallet}
				>
					{!externalWallet ? 'Connect a wallet' : 'Connect another wallet?'}
				</button>
			)}
			{externalWallet && (
				<div>
					<p className='text-md mt-2 text-gray-800'>
						{' '}
						Connected Wallet:{' '}
						<span className='rounded-md bg-blue-600 px-2 py-1 text-sm font-semibold text-slate-200'>
							{externalWallet.address.substring(0, 6) +
								'...' +
								externalWallet.address.slice(-4)}
						</span>
					</p>
					<div className='mt-2 flex flex-row items-center justify-between gap-4'>
						<p className='mt-2 text-sm text-gray-600'>Chain: </p>
						{chainSelect}

						<p className='mt-2 text-sm text-gray-600'>Currency: </p>

						{currencySelect}
					</div>

					<div>
						<Label
							htmlFor='approveAmt'
							className='mb-1 mt-2 flex justify-between '
						>
							{' '}
							<span>Approve Amount</span>{' '}
							<span
								className='text-slate-500'
								onClick={() => setApproveAmt(maxUint256)}
							>
								{' '}
								Max Amount
							</span>{' '}
						</Label>
						<Input
							id='approveAmt'
							placeholder='0.00'
							onChange={(e) =>
								setApproveAmt(parseEther(parseInt(e.target.value).toString()))
							}
							value={
								approveAmt === maxUint256
									? 'Infinite Approval'
									: parseInt(formatEther(approveAmt)).toLocaleString()
							}
						/>
					</div>

					<button
						type='button'
						className='mt-6 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-blue-500'
						onClick={onApprove}
						disabled={!externalWallet || txIsLoading}
					>
						Approve{' '}
						{approveAmt === maxUint256
							? 'Infinite'
							: parseInt(formatEther(approveAmt)).toLocaleString()}{' '}
						{CURRENCIES[requestedCurrency].name}
					</button>
				</div>
			)}

			{/* {requestedNetwork.id != extWalletChainId &&  <button
				type='button'
				className='mt-2 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-blue-400'
				onClick={onAddNetwork}
				disabled={!externalWallet}
			>
				Add {requestedNetwork.name}
			</button>} */}

			{txHash && (
				<p className='mt-2 text-sm italic text-gray-600'>
					See your transaction on{' '}
					<a
						className='underline'
						href={`${links.baseGoerli.transactionExplorer}${txHash}`}
						target='_blank'
						rel='noreferrer noopener'
					>
						Etherscan
					</a>
					.
				</p>
			)}
		</div>
	)

	const approvalCard = (
		<Card className='max-w-[400] overflow-hidden rounded-lg shadow-lg'>
			<div className='ml-4 flex flex-row items-center '>
				<ChevronLeft
					className='h-6 w-6 '
					onClick={() => setRetrievedAddr(zeroAddress)}
				/>
				<CardTitle className=' p-4 font-serif'>Token Approval</CardTitle>
			</div>

			<CardDescription className='p-4'>{connectAndFund}</CardDescription>

			<div className='mx-4 my-2 p-2'>
				<div className='my-2'></div>
			</div>
		</Card>
	)

	return (
		<div>
			{header}
			<div className='min-h-screen bg-gray-100 '>
				<div className='align-center mx-6 my-4 grid grid-cols-1 gap-4 pt-10 md:grid-cols-2'>
					{info}
					{retrievedAddr === zeroAddress ? connectCard : approvalCard}
				</div>
			</div>
		</div>
	)
}

export default Fund
