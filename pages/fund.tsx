import React, { useState, useRef, useEffect } from 'react'
import AuthenticatedPage from '@/components/authenticated-page'
import Section from '@/components/section'
import { links } from '@/lib/links'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import transfer from 'public/icons/mdi_transfer.png'
import { Wallet2, ClipboardPaste } from 'lucide-react'

const NumericInputPage = () => {
	const [number, setNumber] = useState(Array(6).fill(''))
	const inputRefs = useRef<HTMLInputElement[]>([])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
		const value = e.target.value
		if (value === '' || /^[0-9]$/.test(value)) {
			setNumber((prev) => {
				const next = [...prev]
				next[i] = value
				return next
			})
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log(number.join(''))
	}
	useEffect(() => {
		number.forEach((n, i) => {
			if (n !== '' && i < number.length - 1) {
				inputRefs.current[i + 1]!.focus()
			}
		})
	}, [number])

	const handlePaste = async () => {
		const text = await navigator.clipboard.readText()
		const numbers = text
			.split('')
			.filter((char) => /^[0-9]$/.test(char))
			.slice(0, 6)
		setNumber((prev) => [...numbers, ...prev.slice(numbers.length)])
	}

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className='flex flex-row items-center gap-4'
			>
				{number.map((n, i) => (
					<Input
						key={i}
						type='text'
						maxLength={1}
						value={n}
						onChange={(e) => handleChange(e, i)}
						ref={(el) => (inputRefs.current[i] = el!)}
					/>
				))}
				<Button variant={'outline'} disabled={number.every((n) => n === '')}>
					Submit
				</Button>
			</form>
			<div
				className='flex justify-center items-center gray-200'
				onClick={handlePaste}
			>
				<ClipboardPaste className='h-4 w-4' />
				Paste
			</div>
		</div>
	)
}

const Fund = () => {
	return (
		<Section>
			<div className='grid grid-cols-1 md:grid-cols-2 mx-6 my-4'>
				<div>
					<Card>
						<CardTitle className='text-lg'>Open Approval for Tokens</CardTitle>
						<div className=' mx-4 my-2 p-2'>
							<Alert>
								<Wallet2 className='h-4 w-4' />
								<AlertTitle className='pt-2'>No deposits needed</AlertTitle>
								<AlertDescription>
									You don’t need to deposit anything on pmnts
									<br />
									Simply open approval and they’ll be transferred as you spend
									them.
								</AlertDescription>
							</Alert>

							<div>
								<p className=''> Enter Connection code </p>
								<NumericInputPage />
							</div>
						</div>
					</Card>
					<div className=''>
						<h1 className='text-2xl text-bold'>Transfer Helper</h1>
						<Image src={transfer} width={127} height={127} />
					</div>
				</div>
			</div>
		</Section>
	)
}

export default Fund
