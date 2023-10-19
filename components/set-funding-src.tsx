import React, { useState } from 'react'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type Props = {
	handleFundingSource: (fundingSource: number) => void
}

function SelectFundingSource(props: Props) {
	const [fundingSource, setFundingSource] = useState<number>(0)
	const checkFundingSources = async () => {}

	return (
		<Select>
			<SelectTrigger className='w-[180px]'>
				<SelectValue placeholder='pmnts Balance' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Funding Source</SelectLabel>
				</SelectGroup>
			</SelectContent>
		</Select>
	)
}

export default SelectFundingSource
