import React, { useState } from 'react'

import AuthenticatedPage from '@/components/authenticated-page'
import { usePrivy } from '@privy-io/react-auth'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog'
import QrPage from '@/components/create-qr'
import dynamic from 'next/dynamic'

const ShowQrPage = () => {
	const { user } = usePrivy()
	const [scanResult, setScanResult] = useState<string>('0')
	const BarcodeScanner = dynamic(() => import('@/components/qrscan'), {
		ssr: false,
	})

	const handleScanResult = (data: string) => {
		console.log(data)
		setScanResult(data)
	}
	return (
		<AuthenticatedPage>
			{user && (
				<Dialog>
					<DialogTrigger> Open QR</DialogTrigger>
					<QrPage privyuuid={user.id} />
				</Dialog>
			)}
		</AuthenticatedPage>
	)
}

export default ShowQrPage
