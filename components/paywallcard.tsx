import React, { useEffect, useState } from 'react'
import QrPage from './create-qr'
type Props = {
	privyuuid: string
	amountToPay?: number
	currency?: number
}
const PaywallCard = (props: Props) => {
	return (
		<div className='flex flex-col items-center justify-center border border-slate-200 bg-zinc-100'>
			<div className='my-4 flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md'>
				<h1 className='text-center text-2xl font-semibold'>Paywall</h1>
				<p className='text-center text-sm text-gray-400'>
					Create a paywall to charge for access to your content
				</p>
				{/* <QrPage privyuuid={props.privyuuid} /> */}
			</div>
		</div>
	)
}
