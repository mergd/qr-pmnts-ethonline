import TopNav from '@/components/top-nav'
import BottomNav from '@/components/bottom-nav'
import dynamic from 'next/dynamic'

import { usePrivy } from '@privy-io/react-auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useToast } from '@/components/ui/use-toast'

interface Props {
	children: React.ReactNode
	isTestnet?: boolean
}

const AuthenticatedPage = ({ children, isTestnet }: Props) => {
	const router = useRouter()
	const { ready, authenticated } = usePrivy()
	const { toast } = useToast()
	const [testnet, setTestnet] = useState<boolean>(true)

	useEffect(() => {
		if (ready && !authenticated) router.push('/')
	}, [ready, authenticated, router])

	useEffect(() => {
		// setTestnet(
		// 	JSON.parse(localStorage.getItem('testnet') || 'false')
		// )
		localStorage.setItem('testnet', JSON.stringify(testnet))
	}, [isTestnet])

	useEffect(() => {
		function handleOffline() {
			toast({
				title: 'Network error',
				description:
					'You are currently offline. Please check your network connection.',
				variant: 'destructive',
			})
		}

		window.addEventListener('offline', handleOffline)

		return () => {
			window.removeEventListener('offline', handleOffline)
		}
	}, [])

	return (
		<div>
			<TopNav testnet={testnet} />
			<main className='px-safe mx-auto max-w-screen-md pb-16 pt-20 sm:pb-0'>
				<div className='p-6'>{children}</div>
			</main>
			<BottomNav />
		</div>
	)
}

export default AuthenticatedPage
