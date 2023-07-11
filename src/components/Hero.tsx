import React from 'react'
import Image from 'next/image'

import styles from '@/styles/Hero.module.scss'

const Hero = ({ heroContent, heroImage }: any) => {
	return (
		<>
			<section className={styles.hero_section}>
				{heroImage.src && heroImage.alt ? (
					<div className={styles.hero_image}>
						<Image
							src={heroImage.src}
							alt={heroImage.alt}
							fill
							style={{ objectFit: 'cover' }}
							sizes='(min-width: 60em) 24vw,
					(min-width: 28em) 45vw,
					100vw'
							priority
						/>
					</div>
				) : null}
			</section>
			<section className={styles.hero_content}>
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: heroContent.body }}
				/>
			</section>
		</>
	)
}

export default Hero
