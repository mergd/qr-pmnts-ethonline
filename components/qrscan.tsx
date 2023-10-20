import React, { useState, useRef } from 'react'
import { useZxing } from 'react-zxing'
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
type Props = {
	onScanResult: (result: string) => void
}

const QrScanner = (props: Props) => {
	const [result, setResult] = useState('')
	const [isPlaying, setIsPlaying] = useState(false)
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
				</DialogFooter>
			</DialogContent>
		</>
	)
}
export default QrScanner
