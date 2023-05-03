import React from 'react'

import styles from '@/styles/Button.module.scss'

interface Props {
	children: React.ReactNode
	primary?: boolean
	clickCallback?: () => void
}

const Button = ({ children, primary = false, clickCallback }: Props) => {
	return (
		<button
			onClick={(e) => {
				e.stopPropagation()
				clickCallback ? clickCallback() : null
			}}
			className={primary ? `${styles.button} ${styles.primary}` : styles.button}
		>
			{children}
		</button>
	)
}

export default Button
