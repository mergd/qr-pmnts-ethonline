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
	// You can also import other linking methods, like linkWallet, linkEmail, linkDiscord, etc.
	const { user, linkPhone, linkGoogle, linkApple } = usePrivy()
	return (
		<AuthenticatedPage>
			<Section>
				<h1 className='text-3xl font-bold my-4 font-serif'>gm {!user},</h1>
				<Menubar className='h-24 rounded-lg justify-center'>
					<MenubarMenu>
						<MenubarTrigger className=' hover:bg-gray-200'>
							<Link href={'/qr'}>
								<div>
									<QrCode className='w-16 h-16' strokeWidth={1} />
									<p className='text-xs uppercase font-bold text-center'>
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
									<ScanBarcodeIcon className='w-16 h-16' strokeWidth={1} />
									<p className='text-xs uppercase font-bold text-center'>
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
									<PiggyBankIcon className='w-16 h-16' strokeWidth={1} />
									<p className='text-xs uppercase font-bold text-center'>
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
									<Wallet className='w-16 h-16' strokeWidth={1} />
									<p className='text-xs uppercase font-bold text-center'>
										{' '}
										wallet{' '}
									</p>
								</div>
							</Link>
						</MenubarTrigger>
					</MenubarMenu>
				</Menubar>
				<Alert className='my-4'>
					<GiftIcon className='h-6 w-6 mb-2' />
					<AlertTitle>You have 200 points!</AlertTitle>
					<AlertDescription>
						Head to the <Link href={'/points'}>points store</Link> to spend
						them!
					</AlertDescription>
				</Alert>
			</Section>

			{TableDemo()}
		</AuthenticatedPage>
	)
}

export default Dashboard
