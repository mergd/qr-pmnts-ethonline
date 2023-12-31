import { SaveTable } from '@/components/save-table'
import AuthenticatedPage from '@/components/authenticated-page'
import { PiggyBankIcon } from 'lucide-react'

import React, { useState } from 'react'
import { Address, zeroAddress } from 'viem'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ZapIcon, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

import { usePrivy } from '@privy-io/react-auth'

import { Input } from '@/components/ui/input'
import { parseEther, formatEther } from 'viem'
import { Label } from '@/components/ui/label'
import { YieldData, CURRENCIES } from 'public/constants'

const Save = () => {
	const { toast } = useToast()

	const [currentYieldAddr, setCurrentYieldAddr] = useState<Address>(zeroAddress)
	const [underlyingAddress, setUnderlyingAddr] = useState<Address>(zeroAddress)
	const [underlyingSymbol, setUnderlyingSymbol] = useState<string>('')
	const [currencyId, setCurrencyId] = useState<number>(0)
	const [yieldId, setYieldId] = useState<number>(0)
	const [yieldName, setYieldName] = useState<string>('')
	const [activeTab, setActiveTab] = useState<string>('deposit')
	const [amt, setAmt] = useState<bigint>(BigInt(0))

	const handleYield = (
		yieldAddr: Address,
		currencyId: number,
		yieldId: number
	) => {
		setCurrentYieldAddr(yieldAddr)
		setCurrencyId(currencyId)
		setYieldId(yieldId)
		setYieldName(YieldData[currencyId]['yields'][yieldId].name)
		setUnderlyingAddr(CURRENCIES[YieldData[currencyId].currency_id].address)
	}
	const handleDeposit = async () => {
		// deposit

		toast({
			title: `Deposited ${parseInt(formatEther(amt)).toLocaleString()}  ${
				YieldData[currencyId].name
			} into ${yieldName} `,
			description: `Link to block explorer: `,
			action: <ToastAction altText='Goto schedule to undo'>Close</ToastAction>,
		})
	}
	const handleWithdraw = async () => {
		// withdraw

		toast({
			title: `Withdrew ${parseInt(formatEther(amt)).toLocaleString()}  ${
				YieldData[currencyId].name
			} into ${yieldName} `,
			description: `Link to block explorer: `,
			action: <ToastAction altText='Goto schedule to undo'>Close</ToastAction>,
		})
	}

	const amtSetter = (
		<div>
			<Label htmlFor='inputAmt'>Amount</Label>
			<div className='flex flex-row justify-between gap-4'>
				<Input
					id='inputAmt'
					onChange={(e) => setAmt(parseEther(e.target.value))}
					value={formatEther(amt).toLocaleString()}
					placeholder='0.00'
				/>

				<Button
					className='capitalize bold bg-blue-800 text-white '
					inputMode='numeric'
					onClick={activeTab === 'deposit' ? handleDeposit : handleWithdraw}
				>
					{' '}
					{activeTab}{' '}
				</Button>
			</div>
		</div>
	)

	const investCard = () => {
		return (
			<Tabs defaultValue='deposit' className='mt-4'>
				<TabsList className='grid w-full grid-cols-2 bg-slate-200'>
					<TabsTrigger
						onClick={() => setActiveTab('deposit')}
						className={`${activeTab === 'deposit' ? 'bg-slate-100' : ''}`}
						value='deposit'
					>
						Deposit
					</TabsTrigger>
					<TabsTrigger
						onClick={() => setActiveTab('withdraw')}
						className={`${activeTab === 'withdraw' ? 'bg-slate-100' : ''}`}
						value='withdraw'
					>
						Withdraw
					</TabsTrigger>
				</TabsList>
				<TabsContent value='deposit'>
					<Card>
						<CardHeader>
							<CardTitle>Invest</CardTitle>
							<CardDescription>
								Deposit {YieldData[currencyId].name} into{' '}
								<span className='font-bold'> {yieldName}</span> and earn
								interest.
								<br />
								<br />
								{YieldData[currencyId].description}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='flex flex-row justify-between'>
								<div className='flex flex-col'>
									<p className='text-xs'>Deposit</p>
									<p className='text-lg font-bold'>0.00</p>
								</div>
								<div className='flex flex-col'>
									<p className='text-xs'>Earn</p>
									<p className='text-lg font-bold'>
										{YieldData[currencyId].yields[yieldId].apy}
									</p>
								</div>
							</div>
							{amtSetter}
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='withdraw'>
					<Card>
						<CardHeader>
							Withdraw from <span className='font-bold'> {yieldName}</span>
						</CardHeader>
						<CardContent>
							<div className='flex flex-row justify-between'>
								<div className='flex flex-col'>
									<p className='text-xs'>Deposit</p>
									<p className='text-lg font-bold'>0.00</p>
								</div>
								<div className='flex flex-col'>
									<p className='text-xs'>Earn</p>
									<p className='text-lg font-bold'>
										{YieldData[currencyId].yields[yieldId].apy}
									</p>
								</div>
							</div>
							{amtSetter}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		)
	}

	const pointsInfo = (
		<Alert className='mt-4 bg-blue-200	'>
			<ZapIcon className='h-4 w-4 mb-2' color='rgb(30 64 175)' />
			<div className='flex flex-row align-center justify-between blue-900'>
				<AlertTitle>Boost your APY to 20% </AlertTitle>{' '}
				<ChevronRight href='/points' className='h-4 w-4 ' />
			</div>
		</Alert>
	)

	return (
		<AuthenticatedPage>
			<Link href={'/dashboard'}>
				<ArrowLeft className='h-6 w-6 mb-2' />
			</Link>

			<PiggyBankIcon className='w-16 h-16' strokeWidth={1} />

			<h2 className='text-2xl font-bold  font-serif'>Save</h2>
			<p> Make your savings work as hard as you do: </p>

			{SaveTable({ handleSelected: handleYield })}
			{currentYieldAddr != zeroAddress && investCard()}
			{pointsInfo}
		</AuthenticatedPage>
	)
}
export default Save
