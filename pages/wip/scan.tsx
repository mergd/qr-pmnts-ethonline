import React, { useState } from 'react'

import AuthenticatedPage from '@/components/authenticated-page'
import { usePrivy } from '@privy-io/react-auth'
import pmnts from 'public/pmnts-icon.png'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const QrPage = () => {
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
			<div className='flex h-[90%] w-[90%] flex-col items-center justify-center'>
				<BarcodeScanner onScanResult={handleScanResult} />
			</div>
		</AuthenticatedPage>
	)
}

export default QrPage
