import React, { useRef, useState } from 'react'
import Image from 'next/image'

import styles from '@/styles/Hero.module.scss'
import Button from './Button'
import PageHeader from './PageHeader'

const partOfInterval = (zipCode: string, intervalZipCodes: string[]): boolean =>
	intervalZipCodes.some((interval) => {
		const intervalArray = interval.replace(' ', '').split('-')
		if (parseInt(intervalArray[0]) < parseInt(intervalArray[1])) {
			return (
				parseInt(zipCode) >= parseInt(intervalArray[0]) &&
				parseInt(zipCode) <= parseInt(intervalArray[1])
			)
		} else {
			return (
				parseInt(zipCode) <= parseInt(intervalArray[0]) &&
				parseInt(zipCode) >= parseInt(intervalArray[1])
			)
		}
	})

const Hero = ({ deliveryContent, heroContent, heroImage, zipCodes }: any) => {
	const [zipCodeResult, setZipCodeResult] = useState<{
		warning: boolean
		text: string
	} | null>()

	const zipCodeRef = useRef<HTMLInputElement>(null)

	const { gordonZipCodes, dalafiskZipCodes } = zipCodes

	const singleZipCodes = [
		...gordonZipCodes.split('\r\n'),
		...dalafiskZipCodes.split('\r\n'),
	].filter((zipCode) => !zipCode.includes('-'))

	const intervalZipCodes = [
		...gordonZipCodes.split('\r\n'),
		...dalafiskZipCodes.split('\r\n'),
	].filter((zipCode) => zipCode.includes('-'))

	const validateZipCode = (zipCode: string) => {
		if (zipCode.length === 5 && /^\d+$/.test(zipCode)) {
			if (singleZipCodes.includes(zipCode)) {
				setZipCodeResult({
					warning: false,
					text: 'Grattis! Vi kan leverera till dig',
				})
			} else if (partOfInterval(zipCode, intervalZipCodes)) {
				setZipCodeResult({
					warning: false,
					text: 'Grattis! Vi kan leverera till dig',
				})
			} else {
				setZipCodeResult({
					warning: false,
					text: 'Tyvärr kan vi inte leverera till dig',
				})
			}
		} else if (zipCode.length !== 0 || !/^\d+$/.test(zipCode)) {
			setZipCodeResult({
				warning: true,
				text: 'Vänligen fyll i ett korrekt postnummer',
			})
		} else {
			setZipCodeResult(null)
		}
	}

	return (
		<>
			<section className={styles.hero_section}>
				<div className={styles.delivery_container}>
					<div
						className={styles.delivery_content}
						style={{ backgroundImage: `url("/sweden.svg")` }}
					>
						<h2>{deliveryContent.title}</h2>
						<div
							className={styles.content}
							dangerouslySetInnerHTML={{ __html: deliveryContent.body }}
						/>
						<div
							className={`${styles.delivery_status} ${
								zipCodeResult?.warning === false ? styles.result : ''
							}`}
						>
							{zipCodeResult?.text}
						</div>
						<div className={styles.delivery_search}>
							<input
								ref={zipCodeRef}
								type='number'
								placeholder='Fyll i ditt postnummer'
							/>{' '}
							<Button
								primary
								clickCallback={() =>
									validateZipCode(zipCodeRef.current?.value as string)
								}
							>
								Sök
							</Button>
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
				<PageHeader noPadding>{heroContent.title}</PageHeader>
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: heroContent.body }}
				/>
			</section>
		</>
	)
}

export default Hero
