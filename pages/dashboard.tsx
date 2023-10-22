import AuthenticatedPage from '@/components/authenticated-page'
import Section from '@/components/section'
import { usePrivy } from '@privy-io/react-auth'
import { links } from '@/lib/links'
import {
	QrCode,
	ScanBarcodeIcon,
	PiggyBankIcon,
	Wallet,
	GiftIcon,
	ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { TableDemo } from '@/components/txns-table'
import QrPage from '@/components/create-qr'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { useState } from 'react'
const Dashboard = () => {
	const { toast } = useToast()

	const [scanResult, setScanResult] = useState<string>('0')

	const QrScanner = dynamic(() => import('@/components/qrscan'), {
		ssr: false,
	})

	const handleScanResult = (data: string) => {
		console.log(data)
		setScanResult(data)
	}

	const currentHour = new Date().getHours()
	let greeting

	if (currentHour >= 0 && currentHour < 12) {
		greeting = 'gm'
	} else if (currentHour >= 12 && currentHour < 19) {
		greeting = 'ga'
	} else {
		greeting = 'gn'
	}
	const pointsbanner = (
		<Alert className='my-4'>
			<GiftIcon className='mb-2 h-6 w-6' />
			<AlertTitle>You have 200 points!</AlertTitle>
			<AlertDescription className='flex flex-row items-center justify-between'>
				<p>Head to the points store to spend them!</p>
				<Link href={'/points'}>
					<ChevronRight className='mb-2 h-8 w-8' />
				</Link>
			</AlertDescription>
		</Alert>
	)

	// You can also import other linking methods, like linkWallet, linkEmail, linkDiscord, etc.
	const { user, linkPhone, linkGoogle, linkApple } = usePrivy()
	console.log(user?.id)
	return (
		<AuthenticatedPage>
			<Section>
				<h1 className='my-4 font-serif text-3xl font-bold'>{greeting}, </h1>
				<div className=' flex flex-row justify-center rounded-lg border border-gray-200 bg-zinc-50 '>
					<div className=' rounded-lg hover:bg-gray-200 '>
						<Dialog>
							<DialogTrigger>
								<ScanBarcodeIcon
									className='h-16 w-16'
									strokeWidth={1}
									color='#27272a'
								/>
								<p className='text-center text-xs font-bold uppercase'>
									{' '}
									scan{' '}
								</p>
							</DialogTrigger>

							<QrScanner onScanResult={handleScanResult} />
						</Dialog>
					</div>
					<div className=' rounded-lg hover:bg-gray-200'>
						<Dialog>
							<DialogTrigger>
								<QrCode className='h-16 w-16' strokeWidth={1} color='#27272a' />
								<p className='text-center text-xs font-bold uppercase'> qr </p>
							</DialogTrigger>
							{user && <QrPage privyuuid={user.id} />}
						</Dialog>
					</div>
					<div className=' rounded-lg hover:bg-gray-200'>
						<Link href={'/save'}>
							<div>
								<PiggyBankIcon
									className='h-16 w-16'
									strokeWidth={1}
									color='#27272a'
								/>
								<p className='text-center text-xs font-bold uppercase'>
									{' '}
									save{' '}
								</p>
							</div>
						</Link>
					</div>
					<div className=' rounded-lg hover:bg-gray-200'>
						<Link href={'/wallet'}>
							<div>
								<Wallet className='h-16 w-16' strokeWidth={1} color='#27272a' />
								<p className='text-center text-xs font-bold uppercase'>
									{' '}
									wallet{' '}
								</p>
							</div>
						</Link>
					</div>
				</div>
			</Section>
			{pointsbanner}
			{TableDemo()}
		</AuthenticatedPage>
	)
}

export default Dashboard
