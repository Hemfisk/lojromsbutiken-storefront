import React from 'react'
import Link from 'next/link'
import { NextFont } from 'next/dist/compiled/@next/font'
import { Icon } from '@systeminfected/react-payment-icons'

import styles from '@/styles/Footer.module.scss'

interface Props {
	fontFamily: NextFont
	navigation: {
		title: string
		handle: string
		active?: boolean
	}[]
	paymentMethods: any
}

const Footer = ({ fontFamily, navigation, paymentMethods }: Props) => {
	return (
		<div className={`${styles.footer_container} ${fontFamily.className}`}>
			<div className={styles.footer_content}>
				<div className={styles.payment_section}>
					{[
						...paymentMethods.acceptedCardBrands,
						...paymentMethods.supportedDigitalWallets,
					].map((paymentMethod) => (
						<Icon key={paymentMethod} icon={paymentMethod} />
					))}
				</div>
				<div className={styles.footer_section}>
					{navigation.map((link) => (
						<Link key={link.handle} href={link.handle} title={link.title}>
							{link.title}
						</Link>
					))}
				</div>
				Copyright © 2023 Dalafisk
			</div>
		</div>
	)
}

export default Footer
