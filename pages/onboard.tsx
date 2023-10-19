import React from 'react'

import AuthenticatedPage from '@/components/authenticated-page'
import { usePrivy } from '@privy-io/react-auth'
import pmnts from 'public/pmnts-icon.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const OnboardPage = () => {
	return (
		<AuthenticatedPage>
			<div className='flex flex-col items-center h-screen'>
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

				<p className=''>
					{' '}
					Pay friends, pay for things online, and more.
					<br />
					We've set up an account just for you.
					<br />
					<br />
					To get started, set up a funding source.
				</p>
				<Button className='bg-blue-700 text-slate-200 mt-4'>
					<Link href={'/fundMobile'}> Fund </Link>
				</Button>
				<Button variant='link' className='mt-4'>
					<Link
						href={'/dashboard'}
						className='color-gray-700 underline text-sm'
					>
						Skip
					</Link>
				</Button>
			</div>
		</AuthenticatedPage>
	)
}

export default OnboardPage
