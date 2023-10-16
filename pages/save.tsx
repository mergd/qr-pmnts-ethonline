import { SaveTable } from '@/components/save-table'
import AuthenticatedPage from '@/components/authenticated-page'
import { PiggyBankIcon } from 'lucide-react'

import React, { useState } from 'react'
import { Address, zeroAddress } from 'viem'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ZapIcon, ChevronRight, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { usePrivy } from '@privy-io/react-auth'

import { Input } from '@/components/ui/input'

const Save = () => {
	const [currentYieldAddr, setCurrentYieldAddr] = useState<Address>(zeroAddress)
	const [underlyingAddress, setUnderlyingAddr] = useState<Address>(zeroAddress)
	const [underlyingSymbol, setUnderlyingSymbol] = useState<string>('')
	const [yieldName, setYieldName] = useState<string>('')
	const [activeTab, setActiveTab] = useState<string>('deposit')

	const handleYield = (
		yieldAddr: Address,
		underlying: Address,
		yieldName: string,
		symbol: string
	) => {
		setCurrentYieldAddr(yieldAddr)
		setUnderlyingAddr(underlying)
		setYieldName(yieldName)
		setUnderlyingSymbol(symbol)
	}

	const investWidget = () => {
		return (
			<Tabs defaultValue='deposit' className='mt-4'>
				<TabsList className='grid w-full grid-cols-2'>
					<TabsTrigger value='deposit'>Deposit</TabsTrigger>
					<TabsTrigger value='withdraw'>Withdraw</TabsTrigger>
				</TabsList>
				<TabsContent value='deposit'>
					<Card>
						<CardHeader>
							<CardTitle>Invest</CardTitle>
							<CardDescription>
								Deposit your assets and earn interest.
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
									<p className='text-lg font-bold'>0.00</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='withdraw'>
					<Card>
						<CardFooter>
							<div className='flex flex-row justify-between'>
								<div className='flex flex-col'>
									<p className='text-xs'>Deposit</p>
									<p className='text-lg font-bold'>0.00</p>
								</div>
								<div className='flex flex-col'>
									<p className='text-xs'>Earn</p>
									<p className='text-lg font-bold'>0.00</p>
								</div>
							</div>
						</CardFooter>
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
				<ChevronRight className='h-4 w-4 ' />
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
			<p> Make your savings work as hard as you...</p>

			{SaveTable({ handleSelected: handleYield })}
			{currentYieldAddr != zeroAddress && investWidget()}
			{pointsInfo}
		</AuthenticatedPage>
	)
}
export default Save
