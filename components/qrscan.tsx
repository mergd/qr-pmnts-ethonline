import React, { useState, useRef, useEffect } from 'react'
import { useZxing } from 'react-zxing'
import ConfirmTransaction from './confirmation'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Pause, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

type Props = {
	onScanResult: (result: string) => void
}

const QrScanner = (props: Props) => {
	const { toast } = useToast()
	const [result, setResult] = useState('')
	const [isPlaying, setIsPlaying] = useState(false)
	const [currency, setCurrency] = useState<number>(0)
	const [fundingSource, setFundingSource] = useState<number>(0)
	const [amount, setAmount] = useState<number>(0)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [pmntCode, setPmntCode] = useState<string>('')
	const [error, setError] = useState('')

	const onQRscan = (result: string) => {
		setResult(result)
		props.onScanResult(result)
	}

	const { ref } = useZxing({
		paused: !isPlaying,
		onDecodeResult(result) {
			onQRscan(result.getText())
		},
	})

	const togglePlayPause = () => {
		if (ref.current) {
			if (isPlaying) {
				ref.current.pause()
			} else {
				ref.current.play()
			}
			setIsPlaying(!isPlaying)
		}
	}

	const onQrScan = (result: string) => {
		if (!result) return

		const res = JSON.parse(result)
		const { privyId, amount, currency, pmntCode } = res
		if (!privyId) {
			toast({
				title: 'Invalid QR code',
				description: 'Please scan a valid QR code.',
				variant: 'destructive',
			})
			return
		}

		return (
			<Dialog
				open={isDialogOpen}
				onOpenChange={() => setIsDialogOpen(!isDialogOpen)}
			>
				<DialogTrigger>
					<Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
				</DialogTrigger>

				<ConfirmTransaction
					pmntCode={pmntCode}
					recipient={privyId}
					amount={amount}
					currency={currency}
				/>
			</Dialog>
		)
	}

	return (
		<>
			<DialogContent className='bg-slate-100 sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Scan a pmnt QR code</DialogTitle>
					<div className='md-rounded flex flex-col items-center justify-center'>
						{!isPlaying && (
							<div className='top-50 left-50 -translate-x-50 -translate-y-50 absolute transform rounded-lg bg-slate-400 px-8 py-6 text-center text-slate-200'>
								<p>Tap on the button below to enable the camera.</p>
								<p>The camera is paused.</p>
							</div>
						)}
						<video className='z-0 h-96 w-96 rounded-md bg-cover' ref={ref} />
					</div>

					{error === null ? (
						<p>
							<span>Last result:</span>
							<span>{result}</span>
						</p>
					) : (
						<p className='text-red-500'> {error}</p>
					)}

					<Button onClick={togglePlayPause}>
						{isPlaying ? (
							<Pause className='h-6 w-6 ' />
						) : (
							<Play className='h-6 w-6 ' />
						)}
					</Button>
				</DialogHeader>
				<DialogFooter>
					{/* <Button type='submit'>Save changes</Button> */}
					{onQrScan(result)}
				</DialogFooter>
			</DialogContent>
		</>
	)
}
export default QrScanner
