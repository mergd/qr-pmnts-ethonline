import React from 'react'

import AuthenticatedPage from '@/components/authenticated-page'
import { usePrivy } from '@privy-io/react-auth'
import pmnts from 'public/pmnts-icon.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const Wallet = () => {
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
				<h1 className='text-3xl '>Your Account</h1>

				<p> Your linked accounts: </p>
			</div>
		</AuthenticatedPage>
	)
}

export default Wallet
