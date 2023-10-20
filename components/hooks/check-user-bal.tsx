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

// @dev todo

const fetchUserAddress = async (privyuuid: string) => {
	// Query API for user address
}

function CheckPmntsBal(props: Props) {
	let tokenAddr: Address
	let userAddr: Address
	if (props.currency) tokenAddr = CURRENCIES[props.currency].address
	if (props.tokenAddr) tokenAddr = props.tokenAddr
	if (props.userAddr) userAddr = props.userAddr

	if (!props.userAddr && props.privyuuid) {
		// Query API for user address
	}
}

export default CheckPmntsBal
