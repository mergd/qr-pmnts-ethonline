import React, { useEffect, useState } from 'react'

import { Construction } from 'lucide-react'

import AuthenticatedPage from '@/components/authenticated-page'

const Points = () => {
	return (
		<AuthenticatedPage>
			<div>
				<div className='flex flex-col items-center justify-center'>
					<Construction className='h-24 w-24' color='#27272a' />
					<p className='font-serif text-xl font-semibold'>
						{' '}
						Under Construction
					</p>
					<p> Check back in later</p>
				</div>
			</div>
		</AuthenticatedPage>
	)
}
export default Points
