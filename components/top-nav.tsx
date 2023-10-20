import { useLogout, usePrivy } from '@privy-io/react-auth'
import pmntsLogo from 'public/pmnts-logo.png'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
type Props = {
	testnet: boolean
}
const TopNav = ({ testnet }: Props) => {
	const { ready, authenticated } = usePrivy()
	const { logout } = useLogout()

	return (
		<div className='pt-safe fixed left-0 top-0 z-20 w-full bg-zinc-900'>
			<header className='px-safe border-b bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mx-auto flex h-20 max-w-screen-md items-center justify-between px-6'>
					<Link href='/dashboard'>
						<Image src={pmntsLogo} alt='PMNTS' width={90} height={35} />
					</Link>

					<nav className='flex items-center space-x-6'>
						<div className='flex items-center gap-4 space-x-6'>
							{testnet && <Badge className='bg-slate-200'>Testnet</Badge>}

							{ready && authenticated && (
								<div
									className='cursor-pointer text-sm text-gray-600'
									onClick={logout}
								>
									Logout
								</div>
							)}
						</div>
					</nav>
				</div>
			</header>
		</div>
	)
}

export default TopNav
