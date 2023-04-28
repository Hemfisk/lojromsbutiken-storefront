import React from 'react'
import Image from 'next/image'

import styles from '@/styles/Hero.module.scss'

const Hero = ({ heroContent, heroImage }: any) => {
	console.log(heroContent, heroImage)
	return (
		<section className={styles.hero_section}>
			<div className={styles.hero_content}>
				<h1>{heroContent.title}</h1>
				<p dangerouslySetInnerHTML={{ __html: heroContent.body }}></p>
			</div>
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
	)
}

export default Hero
