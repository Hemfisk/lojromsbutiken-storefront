import React from 'react'

import styles from '@/styles/Button.module.scss'

interface Props {
	children: React.ReactNode
	primary?: boolean
	background?: boolean
	inverted?: boolean
	type?: 'button' | 'submit' | 'reset' | undefined
	disabled?: boolean
	clickCallback?: () => void
}

const Button = ({
	children,
	primary = false,
	background = false,
	inverted = false,
	type = 'button',
	disabled = false,
	clickCallback,
}: Props) => {
	return (
		<button
			onClick={(e) => {
				e.stopPropagation()
				clickCallback ? clickCallback() : null
			}}
			type={type}
			disabled={disabled}
			className={
				primary && !inverted
					? `${styles.button} ${styles.primary}`
					: background
					? `${styles.button} ${styles.background}`
					: primary && inverted
					? `${styles.button} ${styles.primary} ${styles.inverted}`
					: styles.button
			}
		>
			{children}
		</button>
	)
}

export default Button
