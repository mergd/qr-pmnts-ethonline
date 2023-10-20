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
import { Address } from 'viem'

type Props = {
	privyuuid: string
}

const QrPage = (props: Props) => {
	const fixedAmtArr = [10, 50, 100]
	const [qrData, setQrData] = useState<string>(() =>
		JSON.stringify({ privyId: props.privyuuid })
	)
	const [addlData, setAddlData] = useState<Boolean>(false)
	const [requestedCurrency, setRequestedCurrency] = useState<number>(0)
	const [requestedAmount, setRequestedAmount] = useState<number>(0)
	const [showCustomAmt, setShowCustomAmt] = useState<Boolean>(false)

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
			console.log('Web Share not supported')
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

	const currencySelect = (
		<Select onValueChange={(e) => setRequestedCurrency(parseInt(e))}>
			<SelectTrigger className='w-full'>
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
			<div className='mb-2 mt-2 flex flex-row gap-2'>
				{fixedAmtArr.map((amt, index) => (
					<Button
						className={` w-full border-2 ${
							requestedAmount === amt && !showCustomAmt
								? 'bg-blue-600 text-white'
								: 'bg-slate-100 text-slate-700'
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
							: 'bg-slate-100 text-slate-700'
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
				{currencySelect}
			</div>
		</div>
	)

	return (
		<>
			<DialogContent className='bg-slate-100 '>
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
						{addlOptions}
					</DialogTitle>
				</DialogHeader>
				<div
					style={{
						height: 'auto',
						margin: '0 auto',
						maxWidth: 256,
						width: '100%',
					}}
				>
					<QRCode
						size={1024}
						style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
						value={qrData}
						viewBox={`0 0 1024 1024`}
					/>
				</div>
				<div className='flex flex-col gap-2'>
					{addlData ? requestOptions : null}
				</div>
			</DialogContent>
		</>
	)
}

export default QrPage
