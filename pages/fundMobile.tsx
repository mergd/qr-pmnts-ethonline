import React, { useState, useEffect } from 'react'

import AuthenticatedPage from '@/components/authenticated-page'
import { usePrivy } from '@privy-io/react-auth'
import pmnts from 'public/pmnts-icon.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/router'

const fundMobile = () => {
	const { user } = usePrivy()
	const privyuuid = user?.id
	const [connectionCode, setConnectionCode] = useState<string>()
	const router = useRouter()
	const goBack = () => {
		router.back()
	}
	useEffect(() => {
		const callFunc = async () => {
			const response = await fetch('/api/connection/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ privyuuid: privyuuid }),
			})
			console.log('privy uuid', privyuuid)
			console.log(response.status)
			const json = await response.json()
			setConnectionCode(json.connectionCode)
		}
		callFunc()
	}, [privyuuid])

	return (
		<AuthenticatedPage>
			<ChevronLeft onClick={goBack} className='mb-2 h-8 w-8' />

			<div className='flex h-screen flex-col items-center'>
				<Image
					src={pmnts}
					alt='PMNTS'
					width={80}
					height={80}
					className='rounded-full'
				/>
				<Card className='my-4 py-4'>
					<CardContent>
						<p className='text-slate-700'>
							{' '}
							Open{' '}
							<Link
								href='/fund'
								className='!underline-offset-2 hover:text-blue-900'
							>
								this link
							</Link>{' '}
							on your computer, and enter in this connection code:{' '}
						</p>
						{connectionCode && (
							<h1 className='mt-4 text-center text-6xl tracking-widest text-slate-800'>
								{' '}
								{connectionCode}
							</h1>
						)}
					</CardContent>
				</Card>
			</div>
		</AuthenticatedPage>
	)
}

export default fundMobile
