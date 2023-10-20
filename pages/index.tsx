import { useLogin, usePrivy, useWallets } from '@privy-io/react-auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { isAndroid } from 'react-device-detect'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/menubar'

import { QrCode, ScanBarcode, BadgeDollarSign, PiggyBank } from 'lucide-react'

const Index = () => {
	const { toast } = useToast()
	const [isInstalled, setIsInstalled] = useState(false)
	const [installationPrompt, setInstallationPrompt] = useState<any>()
	const router = useRouter()
	const { ready, authenticated, user } = usePrivy()
	const { wallets } = useWallets()
	// Create wallet if they are new
	const createAccount = async () => {
		const embeddedWallet = wallets.find(
			(wallet) => wallet.walletClientType === 'privy'
		)

		const response = await fetch('/api/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				address: embeddedWallet?.address,
				privyuuid: user?.id,
			}),
		})

		if (response.status === 200) {
			toast({
				title: 'Account Created!',
				description: `${(
					<div>
						<Link href={`https://goerli.basescan.org/${response.body}`}>
							{' '}
							Transaction Hash
						</Link>

						<p> +50 points!</p>
					</div>
				)}`,
			})
			const json = await response.json()
			console.log(json)
			return Promise.resolve()
		} else {
			toast({
				title: 'Account Creation failed',
				description: 'Please try again later.',
				variant: 'destructive',
			})
			const json = await response.json()
			console.log(json)
			return Promise.reject()
		}
	}

	const { login } = useLogin({
		// Set up an `onComplete` callback to run when `login` completes
		onComplete(user, isNewUser, wasPreviouslyAuthenticated) {
			console.log('🔑 ✅ Login success', {
				user,
				isNewUser,
				wasPreviouslyAuthenticated,
			})

			if (isNewUser) {
				createAccount().then(() => {
					setTimeout(() => {
						router.push('/onboard')
					}, 2000) // 2 seconds delay
				})
			} else {
				router.push('/dashboard')
			}
		},
		// Set up an `onError` callback to run when there is a `login` error
		onError(error) {
			console.log('🔑 🚨 Login error', { error })
		},
	})

	useEffect(() => {
		// Helps you prompt your users to install your PWA
		// See https://web.dev/learn/pwa/installation-prompt/
		// iOS Safari does not have this event, so you will have
		// to prompt users to add the PWA via your own UI (e.g. a
		// pop-up modal)
		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault()
			setIsInstalled(false)
			setInstallationPrompt(e)
		})
	}, [])

	useEffect(() => {
		// Detect if the PWA is installed
		// https://web.dev/learn/pwa/detection/#detecting-the-transfer
		window.addEventListener('DOMContentLoaded', () => {
			if (window.matchMedia('(display-mode: standalone)').matches) {
				setIsInstalled(true)
			}
		})
	})

	const promptToInstall = async () => {
		if (!installationPrompt) return
		installationPrompt.prompt()
		installationPrompt.userChoice.then((response: { outcome: string }) => {
			setIsInstalled(response.outcome === 'accepted')
		})
	}

	const menuBar = (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger>
					<ScanBarcode className='h-4 w-4' />
				</MenubarTrigger>
				<MenubarTrigger>
					<QrCode className='h-4 w-4' />
				</MenubarTrigger>
				<MenubarTrigger>
					<BadgeDollarSign className='h-4 w-4' />
				</MenubarTrigger>
				<MenubarTrigger>
					<PiggyBank className='h-4 w-4' />
				</MenubarTrigger>
			</MenubarMenu>
		</Menubar>
	)

	return (
		<>
			<Head>
				<title> pmnts 💸 </title>
			</Head>

			<main>
				<div className='flex h-screen w-screen flex-col items-center justify-center'>
					<h1 className='text-[100px] hover:animate-shake'>💸</h1>

					<h2 className='my-4 text-xl font-semibold text-gray-800'>
						Make pmnts the easy way.
					</h2>
					{menuBar}

					<div className='mt-2 w-1/2'>
						{!isInstalled && isAndroid ? (
							<button
								className='my-4 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400'
								onClick={promptToInstall}
							>
								Install App
							</button>
						) : (
							<button
								className='my-4 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400'
								onClick={login}
								// Always check that Privy is `ready` and the user is not `authenticated` before calling `login`
								disabled={!ready || authenticated}
							>
								Login
							</button>
						)}
					</div>
				</div>
			</main>
		</>
	)
}

export default Index
