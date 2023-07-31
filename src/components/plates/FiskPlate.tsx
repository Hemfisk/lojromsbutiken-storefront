import React from 'react'
import Image from 'next/image'
import { PlateComponent } from './plateUtils'
import styles from '@/styles/Hero.module.scss'

const FiskPlate = ({ title }: PlateComponent) => {
	return (
		<>
			<div className={styles.sign} style={{ transform: 'rotate(10deg)' }}>
				<div className={styles.sign_content}>
					<Image
						src='/hero/fisk-sign.svg'
						alt={`${title} skylt`}
						fill
						sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
						loading='eager'
						priority
					/>
				</div>
			</div>
			<Image
				src='/hero/fisk-plate.png'
				alt={`${title} tallrik`}
				fill
				sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
				loading='eager'
				priority
			/>
		</>
	)
}

export default FiskPlate
