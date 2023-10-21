import React, { useEffect } from 'react'

import AuthenticatedPage from '@/components/authenticated-page'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import pmnts from 'public/pmnts-icon.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import Link from 'next/link'
const OnboardPage = () => {
	const { toast } = useToast()

	return (
		<AuthenticatedPage>
			<div className='flex h-screen flex-col items-center'>
				<Image
					src={pmnts}
					alt='PMNTS'
					width={80}
					height={80}
					className='rounded-full'
				/>
				<h1 className='text-3xl '>
					Welcome to <span className='font-serif font-bold'> pmnts </span>
				</h1>

				<p className='pt-2 text-center'>
					{' '}
					Pay friends, pay for things online, and more.
					<br />
					We&apos;ve set up an account just for you.
					<br />
					<br />
					To get started, set up a funding source.
				</p>
				<Button className='mt-4 bg-blue-700 text-white'>
					<Link href={'/fundMobile'}> Fund </Link>
				</Button>
				<Button variant='link' className='mt-4'>
					<Link
						href={'/dashboard'}
						className='color-gray-700 text-sm underline'
					>
						Skip
					</Link>
				</Button>
			</div>
		</AuthenticatedPage>
	)
}

export default OnboardPage
