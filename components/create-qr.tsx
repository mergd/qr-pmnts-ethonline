import React, { useEffect, useState } from 'react'
import { HelpingHand, ReceiptIcon, ShareIcon } from 'lucide-react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from './ui/badge'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
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
import { useToast } from './ui/use-toast'
import SelectCurrency from './select-currency'

import QR from './qr'

import { CURRENCIES } from '@/public/constants'
type Props = {
	privyuuid: string
	currencyToPay?: number
	amountToPay?: number
	justPay?: boolean
	handleFulfilled?: () => void
}

const QrPage = (props: Props) => {
	const { toast } = useToast()
	const fixedAmtArr = [10, 50, 100]
	const [fulfilled, setFulfilled] = useState(false)
	const [requestId, setRequestId] = useState<string>()
	const [qrData, setQrData] = useState<string>(() =>
		JSON.stringify({ privyId: props.privyuuid })
	)
	const [addlData, setAddlData] = useState<Boolean>(false)
	const [requestedCurrency, setRequestedCurrency] = useState<number>(() =>
		props.currencyToPay ? props.currencyToPay : 0
	)
	const [requestedAmount, setRequestedAmount] = useState<number>(() =>
		props.amountToPay ? props.amountToPay : 0
	)
	const [showCustomAmt, setShowCustomAmt] = useState<Boolean>(false)

	// For in app p2p payments
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

	// For paywall
	useEffect(() => {
		// Fetch code and add it
		if (props.justPay) getPmntCode()
	}, [props.justPay])

	useEffect(() => {
		if (requestId) {
			const eventSource = new EventSource(`/api/spend/request?id=${requestId}`)

			eventSource.onmessage = function (event) {
				const data = JSON.parse(event.data)
				if (data.fulfilled) {
					setFulfilled(true)
					eventSource.close()
				}
			}

			eventSource.onerror = function (event) {
				console.error('EventSource failed:', event)
			}

			return () => {
				eventSource.close()
			}
		}
	}, [requestId])

	useEffect(() => {
		if (fulfilled) {
			props.handleFulfilled && props.handleFulfilled()
		}
	}, [fulfilled])

	const getPmntCode = async () => {
		const response = await fetch('/api/spend/request', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				privyuuid: props.privyuuid,
				currency: requestedCurrency,
				amount: requestedAmount,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.catch((err) => {
				console.log(err)
			})
		if (!response || !response.body) {
			console.log('No response')
		} else {
			// Append pmnt code to the JSON
			let data = JSON.parse(qrData)
			data.pmntCode = response.id
			setRequestId(response.id)
			setQrData(JSON.stringify(data))
		}
	}

	// @dev todo implement paylink
	const handleShare = () => {
		if (navigator.share) {
			navigator
				.share({
					title: 'Pay me with pmnts',
					text: 'Use this link to pay me',
					url: `/paylink/${encodeURIComponent(qrData)}`,
				})
				.catch((error) => console.log('Error sharing', error))
		} else {
			// Paste to clipboard
			navigator.clipboard.writeText(
				`https://pmnts.io/paylink/${encodeURIComponent(qrData)}`
			)

			// Show toast
			toast({
				title: 'Link copied',
				duration: 1000,
			})
		}
	}

	const addlOptions = (
		<Select
			onValueChange={(e) =>
				e === 'request' ? setAddlData(true) : setAddlData(false)
			}
		>
			<SelectTrigger className='w-[70px]'>
				<SelectValue
					placeholder={<HelpingHand className='h-4 w-4' color='#808080' />}
				/>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup className='bg-slate-50'>
					<SelectLabel>Payment Options</SelectLabel>
					<SelectItem value='paymentCode'>
						<HelpingHand className='h-4 w-4' color='#808080' />
					</SelectItem>
					<SelectItem value='request'>
						<p className={`ml-5 ${addlData && 'invisible'} `}>Request </p>{' '}
						<ReceiptIcon className='-mt-4 h-4 w-4' />{' '}
					</SelectItem>
					<SelectItem disabled value='apple'>
						Make Payment
					</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	)

	const requestOptions = (
		<div>
			<div className='mb-2 mt-2 flex flex-row gap-2'>
				{fixedAmtArr.map((amt, index) => (
					<Button
						key={index}
						className={` w-full border-2 ${
							requestedAmount === amt && !showCustomAmt
								? 'bg-blue-600 text-white'
								: 'bg-zinc-100 text-zinc-700'
						}`}
						onClick={() => setRequestedAmount(amt)}
					>
						{amt}
					</Button>
				))}
				<Button
					className={` w-full ${
						showCustomAmt
							? 'bg-blue-600 text-white'
							: 'bg-zinc-100 text-zinc-700'
					}`}
					onClick={() => setShowCustomAmt(!showCustomAmt)}
				>
					{' '}
					Other:{' '}
				</Button>
			</div>

			<div className='flex flex-row gap-4'>
				{showCustomAmt && (
					<Input
						type='number'
						placeholder='Amount'
						value={requestedAmount.toLocaleString()}
						onChange={(e) => setRequestedAmount(parseInt(e.target.value))}
					/>
				)}
				<SelectCurrency handleCurrency={setRequestedCurrency} />
			</div>
		</div>
	)

	const appPayment = (
		<>
			<QR data={qrData} />
			<div className='flex flex-col gap-2'>
				{addlData ? requestOptions : null}
			</div>
		</>
	)

	const payWall = (
		<div className='flex flex-col items-center gap-2'>
			<QR data={qrData} />
			<div>
				<p>
					{' '}
					Pay {props.amountToPay}{' '}
					{props.currencyToPay ? CURRENCIES[0].symbol : ''}{' '}
				</p>
			</div>
			<div>
				{' '}
				Status:{' '}
				{fulfilled ? (
					<Badge className='bg-blue-500 uppercase text-white'>
						{' '}
						Payment Received
					</Badge>
				) : (
					<Badge
						onClick={() => setFulfilled(!fulfilled)}
						className='bg-zinc-300 uppercase '
					>
						{' '}
						Pending Payment
					</Badge>
				)}{' '}
			</div>
		</div>
	)

	return (
		<>
			<DialogContent className='bg-zinc-100 '>
				<DialogHeader>
					<DialogTitle className='mr-6 flex flex-row justify-between'>
						{' '}
						<p className='flex  items-center gap-4'>
							Your Scan Code{' '}
							<ShareIcon
								onClick={handleShare}
								className='h-5 w-5 cursor-pointer'
								color='#808080'
							/>{' '}
						</p>
						{!props.justPay && addlOptions}
					</DialogTitle>
				</DialogHeader>
				{!props.justPay && appPayment}
				{props.justPay && payWall}
			</DialogContent>
		</>
	)
}

export default QrPage
