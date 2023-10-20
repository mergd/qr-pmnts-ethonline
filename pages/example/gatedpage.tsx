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

const BlogGatedPage = () => {
	const payWallcard = (
		<div className='fixed inset-0 z-10 flex items-center justify-center'>
			<div className='rounded bg-white p-6 shadow-lg'>
				<h2 className='mb-4 text-2xl'>Paywall</h2>
				<p>Please subscribe to continue reading.</p>
				{/* Add your payment form or button here */}
			</div>
		</div>
	)

	const [passPaywall, setPassPaywall] = useState<boolean>(false)
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
					{payWallcard}
					<span className={`${passPaywall ? '' : 'blur-sm'}`}>
						To be fair, you have to have a very high IQ to understand Bitcoin.
						Its future applications are extremely subtle, and without a solid
						grasp of computing and economics most of its possible functions will
						go over a typical investor&apos;s head.
						<br /> There&apos;s also Sitoshis&apos;s free market outlook, which
						is deftly woven into his creation- his personal philosophy draws
						heavily from Robert Malthus, for instance. The shills understand
						this stuff; they have the intellectual capacity to truly appreciate
						the depths of this coin, to realise that it is not just speculation
						- it says something deep about LIFE. <br />
						As a consequence people who dislike Bitcoin truly ARE idiots- of
						course they wouldn&apos;t appreciate, for instance, the brilliance
						in Satoshi&apos;s brilliant programming method - the “Blockchain,”
						which itself is a cryptic reference to Haber and Stornetta's Merkle
						trees. <br />
						I&apos;m smirking right now just imagining one of those addlepated
						simpletons scratching their heads in confusion as our lord and
						savior's genius wit unfolds itself on their computer screens. What
						fools.. how I pity them. 😂 And yes, by the way, i DO have a Bitcoin
						tattoo. And no, you cannot see it. It&apos;s for the ladies&apos;
						eyes only- and even then they have to demonstrate that they&apos;re
						within 5 IQ points of my own (preferably lower) beforehand. Nothin
						personnel kid 😎
					</span>
				</div>
				<div className='col-span-1'>
					<Card>
						<CardContent>
							<CardHeader>Example pmnts blog</CardHeader>
							This is my very important blog, if you'd like to support my work,
							mint an NFT, or send me a tip.
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default BlogGatedPage
