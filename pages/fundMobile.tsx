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
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'

function FundMobile() {
	const { toast } = useToast()
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
				.then((response) => response.json())
				.catch((err) => console.log(err))
			console.log('privy uuid', privyuuid)

			setConnectionCode(response.connectionCode)
		}
		callFunc()
	}, [privyuuid])

	const copyCode = () => {
		if (!connectionCode) return
		navigator.clipboard.writeText(connectionCode)
		toast({
			title: 'Copied Code!',
		})
	}

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
							<span className='font-bold underline-offset-2 hover:text-slate-600'>
								<Link href='/fund'>this link</Link>{' '}
							</span>
							on your computer, and enter in this connection code: <br />
							<span className='text-sm text-slate-800'>(Tap to copy)</span>
						</p>
						{connectionCode && (
							<h1
								className='mt-4 text-center text-6xl tracking-widest text-slate-800'
								onClick={copyCode}
							>
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

export default FundMobile
