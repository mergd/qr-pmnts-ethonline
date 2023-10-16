import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useRef, useState } from 'react'
type Props = {
	handleSubmit: (code: Array<string>) => void
}

export const CodeConnect = (props: Props) => {
	const [number, setNumber] = useState(Array(6).fill(''))
	const inputRefs = useRef<HTMLInputElement[]>([])
	const disabled = !number.every(
		(element) => element !== null && element !== ''
	)
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
				className='flex max-w-[400px] flex-row items-center gap-4'
			>
				{number.map((n, i) => (
					<Input
						key={i}
						type='text'
						maxLength={1}
						value={n}
						onChange={(e) => handleChange(e, i)}
						ref={(el) => (inputRefs.current[i] = el!)}
						className='-p-2 h-14 w-10  text-center'
					/>
				))}
				<Button
					variant={'outline'}
					disabled={disabled}
					onClick={() => props.handleSubmit(number)}
				>
					Submit
				</Button>
			</form>
		</div>
	)
}
