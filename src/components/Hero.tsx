import React from 'react'
import Image from 'next/image'

import styles from '@/styles/Hero.module.scss'
import Button from './Button'

const Hero = ({ deliveryContent, heroContent, heroImage }: any) => {
	return (
		<>
			<section className={styles.hero_section}>
				<div className={styles.delivery_container}>
					<div className={styles.delivery_content}>
						<h2>{deliveryContent.title}</h2>
						<p dangerouslySetInnerHTML={{ __html: deliveryContent.body }}></p>
						<div className={styles.delivery_search}>
							<input type='number' placeholder='Fyll i ditt postnummer' />{' '}
							<Button primary>Sök</Button>
						</div>
					</div>
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
			<section className={styles.hero_content}>
				<h1>{heroContent.title}</h1>
				<p dangerouslySetInnerHTML={{ __html: heroContent.body }}></p>
			</section>
		</>
	)
}

export default Hero
