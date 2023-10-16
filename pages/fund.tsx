import React, { useState, useRef, useEffect } from 'react'
import AuthenticatedPage from '@/components/authenticated-page'
import Section from '@/components/section'
import { links } from '@/lib/links'
import Image from 'next/image'

import { CodeConnect } from '@/components/code-input'

import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import transfer from 'public/icons/mdi_transfer.png'
import { Wallet2, ClipboardPaste, ChevronLeft } from 'lucide-react'
import { Address, zeroAddress } from 'viem'
import pmnts from 'public/pmnts-logo.png'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

import { WagmiConfig } from 'wagmi'
import {
	mantleTestnet,
	polygonZkEvmTestnet,
	filecoinCalibration,
	scrollSepolia,
	goerli,
	baseGoerli,
	mainnet,
} from 'wagmi/chains'
import Link from 'next/link'

import { usePrivy, useWallets } from '@privy-io/react-auth'
import { createWalletClient, custom, parseEther } from 'viem'

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
		<Image src={transfer} width={127} height={127} className='object-contain' />
	</div>
)

const header = (
	<div className='flex  justify-start pl-4 pt-4'>
		<Link href={'/'}>
			<Image src={pmnts} width={100} height={30} className='object-contain' />
		</Link>
	</div>
)

const metadata = {
	name: 'pmnts',
	description: 'pmnts app',
	url: 'https://example.com',
	icons: ['https://avatars.githubusercontent.com/u/37784886'],
}
const projectId = 'ade58b9c1b2fbb5886377e609bbfa1d3'

const chains = [mainnet]

const Fund = () => {
	const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
	const [retrievedAddr, setRetrievedAddr] = useState<Address>(zeroAddress)

	const mockAddr = '0x00000000000000000000000001' as Address

	const codeSubmit = (code: Array<string>) => {
		const concatCode = code.join('')
		console.log(concatCode)
		// Should feed code to API to get uuid
		// Fetch address from uuid

		setRetrievedAddr(mockAddr)
	}

	const connectCard = (
		<Card className='max-w-[400] overflow-hidden rounded-lg shadow-lg'>
			<CardTitle className=' p-4'>Open Approval for Tokens</CardTitle>
			<div className='mx-4 my-2 p-2'>
				{alert}

				<div className='my-2'>
					<p className='text-gray-600'> Enter Your Connection code</p>
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

	const onTransfer = async () => {
		if (!externalWallet || !embeddedWallet) return
		try {
			// Switch chain to Base Goerli
			await externalWallet.switchChain(baseGoerli.id)

			// Build viem wallet client for external wallet
			const provider = await externalWallet.getEthereumProvider()
			const walletClient = createWalletClient({
				account: externalWallet.address as `0x${string}`,
				chain: baseGoerli,
				transport: custom(provider),
			})

			// Send transaction from external wallet
			setTxIsLoading(true)
			const _txHash = await walletClient.sendTransaction({
				account: externalWallet.address as `0x${string}`,
				to: embeddedWallet.address as `0x${string}`,
				value: parseEther('0.005'),
			})
			setTxHash(_txHash)
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
					chainId: `0x${baseGoerli.id.toString(16)}`,
					chainName: baseGoerli.name,
					nativeCurrency: baseGoerli.nativeCurrency,
					rpcUrls: [baseGoerli.rpcUrls.public?.http[0] ?? ''],
					blockExplorerUrls: [baseGoerli.blockExplorers?.default.url ?? ''],
				},
			],
		})
	}

	const fund = (
		<Section>
			<p className='text-md mt-2 font-bold uppercase text-gray-700'>
				Fund your embedded wallet
			</p>
			<p className='mt-2 text-sm text-gray-600'>
				First, connect an external wallet to send assets to your embedded
				wallet. The wallet <span className='font-bold'>must</span> support the
				Base Goerli network. We recommend MetaMask.
			</p>
			<p className='mt-2 text-sm text-gray-600'></p>
			<button
				type='button'
				className='mt-2 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400'
				onClick={connectWallet}
			>
				{!externalWallet ? 'Connect a wallet' : 'Connect another wallet?'}
			</button>
			<textarea
				value={
					externalWallet
						? JSON.stringify(externalWallet, null, 2)
						: 'No external wallet connected'
				}
				className='mt-4 h-fit w-full rounded-md bg-slate-700 p-4 font-mono text-xs text-slate-50'
				rows={9}
				readOnly
			/>
			<p className='mt-2 text-sm text-gray-600'>
				Next, add the Base Goerli network to your wallet.
			</p>
			<button
				type='button'
				className='mt-2 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400'
				onClick={onAddNetwork}
				disabled={!externalWallet}
			>
				Add Base Goerli Network
			</button>
			<p className='mt-2 text-sm text-gray-600'>
				Lastly, click the button below to transfer 0.005 Goerli ETH to your
				embedded wallet.
			</p>
			<button
				type='button'
				className='mt-2 w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400'
				onClick={onTransfer}
				disabled={!externalWallet || txIsLoading}
			>
				Transfer 0.005 ETH
			</button>
			{txHash && (
				<p className='mt-2 text-sm italic text-gray-600'>
					See your transaction on{' '}
					<a
						className='underline'
						href={`${links.baseGoerli.transactionExplorer}${txHash}`}
						target='_blank'
						rel='noreferrer noopener'
					>
						etherscan
					</a>
					.
				</p>
			)}
		</Section>
	)

	const approvalCard = (
		<Card className='max-w-[400] overflow-hidden rounded-lg shadow-lg'>
			<div className='ml-4 flex flex-row items-center '>
				<ChevronLeft
					className='h-6 w-6 '
					onClick={() => setRetrievedAddr(zeroAddress)}
				/>
				<CardTitle className=' p-4'>Token Approval</CardTitle>
			</div>

			<CardDescription className='p-4'>
				<w3m-button />
			</CardDescription>

			<div className='mx-4 my-2 p-2'>
				<div className='my-2'></div>
			</div>
		</Card>
	)

	return (
		<WagmiConfig config={wagmiConfig}>
			<div>
				{header}
				<div className='min-h-screen bg-gray-100 '>
					<div className='align-center mx-6 my-4 grid grid-cols-1 gap-4 pt-10 md:grid-cols-2'>
						{info}
						{retrievedAddr === zeroAddress ? connectCard : approvalCard}
					</div>
				</div>
			</div>
		</WagmiConfig>
	)
}

export default Fund
