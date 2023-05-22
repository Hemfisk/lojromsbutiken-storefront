import React from 'react'

import styles from '@/styles/Button.module.scss'

interface Props {
	children: React.ReactNode
	primary?: boolean
	type?: 'button' | 'submit' | 'reset' | undefined
	disabled?: boolean
	clickCallback?: () => void
}

const Button = ({
	children,
	primary = false,
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
			className={primary ? `${styles.button} ${styles.primary}` : styles.button}
		>
			{children}
		</button>
	)
}

export default Button
