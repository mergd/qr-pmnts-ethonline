import React, { useState } from 'react'

import AuthenticatedPage from '@/components/authenticated-page'
import SelectFundingSource from '@/components/set-funding-src'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import pmnts from 'public/pmnts-icon.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import SelectCurrency from '@/components/select-currency'
import { Label } from '@/components/ui/label'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/router'

const Wallet = () => {
	const { toast } = useToast()
	const router = useRouter()
	const [currency, setCurrency] = useState<number>(0)
	const [fundingSource, setFundingSource] = useState<number>(0)
	const handleCurrency = (currency: number) => {
		setCurrency(currency)
	}
	const { exportWallet } = usePrivy()
	const goToDashboard = () => {
		router.push('/dashboard')
	}

	const { ready, authenticated, user } = usePrivy()
	const { wallets } = useWallets()

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
		}).catch((err) => console.log(err))

		if (response && response.status === 200) {
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
			return Promise.reject()
		}
	}
	return (
		<AuthenticatedPage>
			<ChevronLeft onClick={goToDashboard} className='h-8 w-8' />
			<div className='flex h-screen flex-col items-center gap-4'>
				<Image
					src={pmnts}
					alt='PMNTS'
					width={80}
					height={80}
					className='rounded-full'
				/>
				<h1 className='text-3xl '>Your Account</h1>

				<div className='flex flex-row justify-between px-4'>
					<div>
						<p className='text-md mt-8 font-semibold text-gray-700'>
							Export your private key
						</p>
						<p className='mt-2 pr-4 text-sm text-gray-600'>
							Export your embedded wallet&apos;s private key to use in another
							wallet client.
						</p>
					</div>
					<button
						type='button'
						className='mt-8 max-h-12 rounded-md bg-blue-500 px-6  text-sm font-semibold text-white shadow-sm'
						onClick={exportWallet}
					>
						Export key
					</button>
				</div>
				<p className='font-semibold text-gray-700'> Your linked accounts: </p>
				<div className='flex flex-row justify-between gap-4'>
					<p className='text-gray-600'> Link another funding source:</p>
					<Link href={'/fundMobile'}>
						<Button className='bg-slate-200'> Link</Button>
					</Link>
				</div>
				<div className='flex flex-row gap-4'>
					<div>
						<Label> Currency </Label>
						<SelectCurrency handleCurrency={handleCurrency} />
					</div>
					<div>
						<Label> Funding Sources </Label>
						<SelectFundingSource
							currency={currency}
							handleFundingSource={setFundingSource}
							setDefault={true}
						/>
					</div>
				</div>
				<div className='flex flex-row justify-between gap-4'>
					<p onClick={createAccount}>
						{' '}
						Generate Account (if your account failed to initialize)
					</p>
				</div>
			</div>
		</AuthenticatedPage>
	)
}

export default Wallet
