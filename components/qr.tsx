import { CURRENCIES } from '@/public/constants'
import QRCode from 'react-qr-code'
type Props = {
	data: string
}
function QR(props: Props) {
	return (
		<div
			style={{
				height: 'auto',
				margin: '0 auto',
				maxWidth: 256,
				width: '100%',
			}}
			className='relative rounded-md bg-[#FFFDF7] p-4'
		>
			<QRCode
				size={1024}
				style={{
					height: 'auto',
					maxWidth: '100%',
					width: '100%',
				}}
				bgColor='#FFFDF7'
				fgColor='#27272a'
				value={props.data}
				viewBox={`0 0 1024 1024`}
			/>
			<img
				src='/pmnts-icon.png'
				height={50}
				width={50}
				alt='pmnts icon'
				className='absolute bottom-0 right-0 rounded-lg'
			/>
		</div>
	)
}
export default QR
