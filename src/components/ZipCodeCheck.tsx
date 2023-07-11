import React, { useRef, useState } from 'react'

import styles from '@/styles/ZipCodeCheck.module.scss'
import Button from './Button'

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

const ZipCodeCheck = ({ deliveryContent, zipCodes }: any) => {
	const [zipCodeResult, setZipCodeResult] = useState<{
		warning: boolean
		text: string
	} | null>()

	const zipCodeRef = useRef<HTMLInputElement>(null)

	if (!deliveryContent || !zipCodes) {
		return null
	}

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
					text: 'Grattis! Vi kan leverera till dig!',
				})
			} else if (partOfInterval(zipCode, intervalZipCodes)) {
				setZipCodeResult({
					warning: false,
					text: 'Grattis! Vi kan leverera till dig!',
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
		<div className={styles.delivery_background}>
			<div className={styles.delivery_container}>
				<div className={styles.delivery_content}>
					<h2>{deliveryContent.title}</h2>
					<div
						className={styles.content}
						dangerouslySetInnerHTML={{ __html: deliveryContent.body }}
					/>
				</div>
				<div className={styles.delivery_content}>
					<div className={styles.delivery_search}>
						<input
							ref={zipCodeRef}
							type='number'
							placeholder='Fyll i ditt postnummer'
						/>{' '}
						<Button
							primary
							inverted
							clickCallback={() =>
								validateZipCode(zipCodeRef.current?.value as string)
							}
						>
							Sök
						</Button>
					</div>
					<div
						className={`${styles.delivery_status} ${
							zipCodeResult?.warning === false ? styles.result : ''
						}`}
					>
						{zipCodeResult?.text}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ZipCodeCheck
