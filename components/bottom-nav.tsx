import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	UserIcon,
	WalletIcon,
	CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

const BottomNav = () => {
	const router = useRouter()

	return (
		<div className='sm:hidden'>
			<nav className='pb-safe fixed bottom-0 w-full border-t bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mx-auto flex h-16 max-w-md items-center justify-around px-6'>
					{links.map(({ href, label, icon }) => (
						<Link key={label} href={href}>
							<a
								className={`flex h-full w-full flex-col items-center justify-center space-y-1 ${
									router.pathname === href ? 'text-blue-500' : 'text-gray-600'
								}`}
							>
								{icon}
								<span className='text-xs text-zinc-600'>{label}</span>
							</a>
						</Link>
					))}
				</div>
			</nav>
		</div>
	)
}

export default BottomNav

const links = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: <UserIcon className='h-5 w-5 text-blue-600' />,
	},
	{
		label: 'Profile',
		href: '/embedded-wallet',
		icon: <WalletIcon className='h-5 w-5 text-blue-600' />,
	},
	{
		label: 'Account',
		href: '/wallet',
		icon: <WalletIcon className='h-5 w-5 text-blue-600' />,
	},
]
