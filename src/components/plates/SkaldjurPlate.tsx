import React from 'react'
import Image from 'next/image'
import { PlateComponent } from './plateUtils'
import styles from '@/styles/Hero.module.scss'

const SkaldjurPlate = ({ title }: PlateComponent) => {
	return (
		<>
			<div
				className={styles.sign}
				style={{ transform: 'translateX(-10%) rotate(-5deg)' }}
			>
				<div className={styles.sign_content}>
					<Image
						src='/hero/skaldjur-sign.svg'
						alt={`${title} skylt`}
						fill
						sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
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
				priority
			/>
		</>
	)
}

export default SkaldjurPlate
