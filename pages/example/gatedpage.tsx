import { useState } from 'react'

import { PencilIcon } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import PaywallCard from '@/components/paywallcard'
import Image from 'next/image'
import { BadgeDollarSign } from 'lucide-react'

const BlogGatedPage = () => {
	const [passPaywall, setPassPaywall] = useState<boolean>(false)

	const handlePassPaywall = () => {
		setPassPaywall(true)
	}
	const payWallcard = (
		<div className='fixed bottom-80 left-60 z-10 flex items-center justify-center '>
			<PaywallCard
				modalOpen={passPaywall}
				privyuuid='test'
				amountToPay={10}
				currency={0}
				handleFulfilled={handlePassPaywall}
			>
				<BadgeDollarSign className='h-8 w-8' />
				<h1 className='text-center text-xl font-semibold'>
					{' '}
					Support the author{' '}
				</h1>
				<p className='text-center text-sm text-gray-700'>
					Get access to the full article, and exclusive scoops
				</p>
				{/* hehe */}
				<p
					onClick={() => {
						setPassPaywall(!passPaywall)
					}}
					className='text-center text-sm text-gray-400'
				>
					We are using pmnts to accept payments.
				</p>
			</PaywallCard>
		</div>
	)

	return (
		<div className='h-screen px-6 py-8'>
			<div className='flex flex-row justify-between'>
				<div className='flex flex-row items-center gap-4'>
					<PencilIcon className='h-8 w-8' />
					<p className='font-serif font-bold uppercase'> My Blog</p>
				</div>
				<p> About me</p>
			</div>
			<div className='m-4 grid grid-cols-1 gap-4 md:grid-cols-4'>
				<div className='col-span-3'>
					<h1 className='font-serif text-3xl font-bold'>
						The Hidden Truth about Crypto{' '}
					</h1>
					{/* blog Content */}
					sigh
					<br />
					<br />
					{!passPaywall && payWallcard}
					<span className={`${passPaywall ? '' : 'blur-sm'}`}>
						To be fair, you have to have a very high IQ to understand Bitcoin.
						Its future applications are extremely subtle, and without a solid
						grasp of computing and economics most of its possible functions will
						go over a typical investor&apos;s head.
						<Image
							className={`${passPaywall ? 'visible' : 'invisible'}`}
							src='/images/4.jpg'
							alt='PMNTS'
							width={100}
							height={100}
						/>
						<br />
						<br /> There&apos;s also Sitoshis&apos;s free market outlook, which
						is deftly woven into his creation- his personal philosophy draws
						heavily from Robert Malthus, for instance. The shills understand
						this stuff; they have the intellectual capacity to truly appreciate
						the depths of this coin, to realise that it is not just speculation
						- it says something deep about LIFE. <br />
						As a consequence people who dislike Bitcoin truly ARE idiots- of
						course they wouldn&apos;t appreciate, for instance, the brilliance
						in Satoshi&apos;s brilliant programming method - the “Blockchain,”
						which itself is a cryptic reference to Haber and Stornetta&apos;s
						Merkle trees. <br />
						<Image
							className={`${passPaywall ? 'visible' : 'invisible'}`}
							src='/images/sbf.jpg'
							alt='PMNTS'
							width={100}
							height={100}
						/>
						<br />
						I&apos;m smirking right now just imagining one of those addlepated
						simpletons scratching their heads in confusion as our lord and
						savior&apos;s genius wit unfolds itself on their computer screens.
						What fools.. how I pity them. 😂 And yes, by the way, i DO have a
						Bitcoin tattoo. And no, you cannot see it. It&apos;s for the
						ladies&apos; eyes only- and even then they have to demonstrate that
						they&apos;re within 5 IQ points of my own (preferably lower)
						beforehand. Nothin personnel kid 😎
					</span>
				</div>
				<div className='col-span-1'>
					<Card>
						<CardContent>
							<CardHeader>Example pmnts blog</CardHeader>
							This is my very important blog, if you&apos;d like to support my
							work, mint an NFT, or send me a tip.
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default BlogGatedPage
