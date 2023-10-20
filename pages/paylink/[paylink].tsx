import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

// @dev todo (low prio though)
function Paylink() {
	const router = useRouter()
	const { privyuuid, currency, amount } = router.query

	if (privyuuid && currency && amount) {
		// Pay specific amount in currency
	} else if (privyuuid && currency) {
		// Pay any amount in currency
	} else if (privyuuid) {
		// Pay any amount in any currency
	} else {
		// Error
	}

	return (
		<div>
			<h1>Paylink, which has not been implemented yet</h1>
		</div>
	)
}
export default Paylink
