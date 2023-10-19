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

const BarcodeScanner = (props: Props) => {
	const [result, setResult] = useState('')
	const [isPlaying, setIsPlaying] = useState(true)
	const [error, setError] = useState('')

	const onQRscan = (result: string) => {
		setResult(result)
		props.onScanResult(result)
	}

	const { ref } = useZxing({
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
			<DialogContent className='sm:max-w-[425px] bg-blue-100'>
				<DialogHeader>
					<DialogTitle>Scan a pmnt QR code</DialogTitle>
					<div className='md-rounded flex h-[90%] w-[90%] flex-col items-center justify-center'>
						<div
							className={`relative ${
								isPlaying ? '' : 'bg-black bg-opacity-50'
							} z-9`}
						>
							<video className='z-0 h-96 w-96 rounded-md bg-cover' ref={ref} />
						</div>
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
					<Button type='submit'>Save changes</Button>
				</DialogFooter>
			</DialogContent>
		</>
	)
}
export default BarcodeScanner
