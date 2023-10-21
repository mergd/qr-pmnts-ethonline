import React, { useEffect, useState } from 'react'
import QrPage from './create-qr'
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog'
type Props = {
	privyuuid: string
	amountToPay: number
	currency: number
	title?: string
	description?: string
	children?: React.ReactNode
	modalOpen?: boolean
	handleFulfilled?: () => void
}
const PaywallCard = (props: Props) => {
	return (
		<div className='flex flex-col items-center justify-center gap-2 px-6 py-4 '>
			<div className=' flex w-full  flex-col items-center justify-center rounded-lg bg-white p-8 shadow-md'>
				{props.children}
				<Dialog>
					<DialogTrigger className='mt-4 rounded-md bg-blue-500 px-2 py-1 text-white'>
						Make Payment
					</DialogTrigger>
					<QrPage
						privyuuid={props.privyuuid}
						amountToPay={props.amountToPay}
						currencyToPay={props.currency}
						justPay={true}
						handleFulfilled={props.handleFulfilled}
					/>
				</Dialog>
			</div>
		</div>
	)
}
export default PaywallCard
