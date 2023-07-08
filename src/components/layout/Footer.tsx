import React from 'react'
import Link from 'next/link'
import { NextFont } from 'next/dist/compiled/@next/font'
import { Icon } from '@systeminfected/react-payment-icons'

import styles from '@/styles/Footer.module.scss'
import Image from 'next/image'

interface Props {
	fontFamily: NextFont
	navigation: {
		title: string
		handle: string
		active?: boolean
	}[]
	paymentMethods: any
	contactInfo: any
}

const Footer = ({
	fontFamily,
	navigation,
	paymentMethods,
	contactInfo,
}: Props) => {
	const paymentMethodsArray = paymentMethods
		? [
				...paymentMethods.acceptedCardBrands,
				...paymentMethods.supportedDigitalWallets,
		  ]
		: []

	return (
		<div className={`${styles.footer_container} ${fontFamily.className}`}>
			<div className={styles.footer_content}>
				<div className={styles.payment_section}>
					{paymentMethodsArray.map((paymentMethod) => (
						<Icon key={paymentMethod} icon={paymentMethod} />
					))}
				</div>
				<div className={styles.footer_section}>
					<div className={styles.footer_navigation}>
						{navigation.map((link) => (
							<Link key={link.handle} href={link.handle} title={link.title}>
								{link.title}
							</Link>
						))}
					</div>
					<div className={styles.footer_certification}>
						<div className={styles.certification_image}>
							<Image
								src='/aaa-logotyp.png?s'
								alt='Bisnode kreditvärdighet'
								fill
								sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
							/>
						</div>
						Högsta kreditvärdighet
						<br />
						Org nr: 556726-3560
					</div>
					<div
						className={styles.footer_contact_info}
						dangerouslySetInnerHTML={{ __html: contactInfo.body }}
					/>
				</div>
				Copyright © 2023 Dalafisk
			</div>
		</div>
	)
}

export default Footer
