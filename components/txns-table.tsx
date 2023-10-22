import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { CURRENCIES } from '@/public/constants'
import Image from 'next/image'
const transactions = [
	{
		txHash: '0x1d16315464875554265345435',
		date: '10-22-2023',
		description: 'sDAI deposited into',
		currency: 3,
		amount: 100,
		pointsEarned: 100,
	},
	{
		txHash: '0xad16315464875554265945434',
		date: '10-22-2023',
		description: 'Funding Source Linked',
		currency: 0,
		amount: 0,
		pointsEarned: 50,
	},
	{
		txHash: '0x8e16315464875554265345434',
		date: '10-22-2023',
		description: 'Account Set Up',
		currency: null,
		amount: null,
		pointsEarned: 50,
	},
]

export function TableDemo() {
	return (
		<Table>
			{/* <TableCaption>Your transactions</TableCaption> */}
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>Date</TableHead>
					<TableHead>Currency</TableHead>
					<TableHead>Description</TableHead>
					<TableHead>ID</TableHead>
					<TableHead>Points</TableHead>
					<TableHead className='text-right'>Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{transactions.map((tx) => (
					<TableRow key={tx.txHash}>
						<TableCell className='font-medium'>{tx.date}</TableCell>
						<TableCell>
							{tx.currency ? (
								<div className='flex flex-row items-center gap-1'>
									<Image
										src={`/icons/${CURRENCIES[tx.currency].icon}`}
										height={15}
										width={15}
										alt='token image'
										className='-mb-1'
									/>{' '}
									{CURRENCIES[tx.currency].symbol}
								</div>
							) : (
								''
							)}
						</TableCell>
						<TableCell>{tx.description ? tx.description : ''}</TableCell>
						<TableCell>
							{
								<span className='underline-1 text-slate-500'>
									{' '}
									{tx.txHash.substring(0, 4)}{' '}
								</span>
							}
						</TableCell>
						<TableCell>{tx.pointsEarned}</TableCell>
						<TableCell className='text-right'>
							{' '}
							{tx.amount && tx.currency
								? `${tx.amount + ' ' + CURRENCIES[tx.currency].symbol}`
								: ''}{' '}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
