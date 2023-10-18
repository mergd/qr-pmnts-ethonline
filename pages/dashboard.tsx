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
import {
	Menubar,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from '@/components/ui/menubar'

import { TableDemo } from '@/components/txns-table'

import Link from 'next/link'
const Dashboard = () => {
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
				<h1 className='my-4 font-serif text-3xl font-bold'>gm</h1>
				<Menubar className='h-24 justify-center rounded-lg'>
					<MenubarMenu>
						<MenubarTrigger className=' hover:bg-gray-200'>
							<Link href={'/qr'}>
								<div>
									<QrCode className='h-16 w-16' strokeWidth={1} />
									<p className='text-center text-xs font-bold uppercase'>
										{' '}
										qr{' '}
									</p>
								</div>
							</Link>
						</MenubarTrigger>
						<MenubarSeparator />
						<MenubarTrigger className=' hover:bg-gray-200'>
							<Link href={'/scan'}>
								<div>
									<ScanBarcodeIcon className='h-16 w-16' strokeWidth={1} />
									<p className='text-center text-xs font-bold uppercase'>
										{' '}
										scan{' '}
									</p>
								</div>
							</Link>
						</MenubarTrigger>
						<MenubarSeparator />
						<MenubarTrigger className=' hover:bg-gray-200'>
							<Link href={'/save'}>
								<div>
									<PiggyBankIcon className='h-16 w-16' strokeWidth={1} />
									<p className='text-center text-xs font-bold uppercase'>
										{' '}
										save{' '}
									</p>
								</div>
							</Link>
						</MenubarTrigger>
						<MenubarSeparator />
						<MenubarTrigger className=' hover:bg-gray-200'>
							<Link href={'/wallet'}>
								<div>
									<Wallet className='h-16 w-16' strokeWidth={1} />
									<p className='text-center text-xs font-bold uppercase'>
										{' '}
										wallet{' '}
									</p>
								</div>
							</Link>
						</MenubarTrigger>
					</MenubarMenu>
				</Menubar>
			</Section>
			{pointsbanner}
			{TableDemo()}

			<Link href='/fundMobile'>test</Link>
		</AuthenticatedPage>
	)
}

export default Dashboard
