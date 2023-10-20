import React, { useState, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import { CURRENCIES } from '@/public/constants'
import { Address } from 'viem'

type Props = {
	currency?: number
	tokenAddr?: Address
	userAddr?: Address
	privyuuid?: string
}
function CheckPmntsBal(props: Props) {
	let tokenAddr: Address
	let userAddr: Address
	let privyuuid: string
	if (props.currency) tokenAddr = CURRENCIES[props.currency].address
	if (props.tokenAddr) tokenAddr = props.tokenAddr
	if (props.userAddr) userAddr = props.userAddr
	else if (props.privyuuid) privyuuid = props.privyuuid
	else {
		const { user } = usePrivy()
		if (!user) return
		privyuuid = user.id
	}

	if (!props.userAddr) {
	}
}

export default CheckPmntsBal
