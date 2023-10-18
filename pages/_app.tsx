import type { AppProps } from 'next/app'
import Meta from '@/components/meta'
import '@/styles/globals.css'
import { PrivyProvider } from '@privy-io/react-auth'
import { Toaster } from '@/components/ui/toaster'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<PrivyProvider
			appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
			config={{
				loginMethods: ['email', 'apple', 'google'],
				embeddedWallets: {
					createOnLogin: 'all-users',
				},
			}}
		>
			<Meta />
			<Component {...pageProps} />
			<Toaster />
		</PrivyProvider>
	)
}

export default App
