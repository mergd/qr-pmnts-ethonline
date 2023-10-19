import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import QRCode from 'react-qr-code'
import { CURRENCIES } from '@/public/constants'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type Props = {
	privyuuid: string
}

const QrPage = (props: Props) => {
	const [qrData, setQrData] = useState<string>(
		JSON.stringify({ privyId: props.privyuuid })
	)
	const [addlData, setAddlData] = useState<Boolean>(false)
	const [requestedCurrency, setRequestedCurrency] = useState<number>(0)
	const [requestedAmount, setRequestedAmount] = useState<number>(0)
	const addlOptions = (
		<Select
			onValueChange={(e) =>
				e === 'request' ? setAddlData(true) : setAddlData(false)
			}
		>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='Select a fruit' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Payment Options</SelectLabel>
					<SelectItem value='request'>Request Money</SelectItem>
					<SelectItem disabled value='apple'>
						Make Payment
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)

	const currencySelect = (
		<Select onValueChange={(e) => setRequestedCurrency(parseInt(e))}>
			<SelectTrigger className='w-[220px]'>
				<SelectValue placeholder={'USD'} />
			</SelectTrigger>
			<SelectContent className='bg-slate-50'>
				<SelectGroup>
					<SelectLabel>Tokens</SelectLabel>
					{CURRENCIES.map((currency, index) => (
						<SelectItem
							key={index}
							value={index.toString()}
							className='no-wrap flex flex-row items-center gap-1'
						>
							{' '}
							<Image
								src={`/icons/${currency.icon}`}
								height={20}
								width={20}
								className='-mb-2'
							/>{' '}
							{currency.name}{' '}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	)

	useEffect(() => {
		!addlData && setQrData(JSON.stringify({ privyId: props.privyuuid }))
		addlData &&
			setQrData(
				JSON.stringify({
					privyId: props.privyuuid,
					currency: requestedCurrency,
					amount: requestedAmount,
				})
			)
	}, [addlData, requestedCurrency, requestedAmount])

	const requestOptions = (
		<div>
			{currencySelect}
			<Input
				type='number'
				placeholder='Amount'
				onChange={(e) => setRequestedAmount(parseInt(e.target.value))}
			/>
		</div>
	)

	return (
		<>
			<DialogContent className='bg-blue-100 sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle> Scan this QR code to receive payments</DialogTitle>
				</DialogHeader>
				<DialogFooter>
					<div
						style={{
							height: 'auto',
							margin: '0 auto',
							maxWidth: 64,
							width: '100%',
						}}
					>
						<QRCode
							size={256}
							style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
							value={qrData}
							viewBox={`0 0 256 256`}
						/>
					</div>
					<Select></Select>
					{addlOptions}
					{addlData ? requestOptions : null}
					{/* <Button type='submit'>Save changes</Button> */}
				</DialogFooter>
			</DialogContent>
		</>
	)
}

export default QrPage
