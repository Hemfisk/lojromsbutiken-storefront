import React from 'react'

import styles from '@/styles/Button.module.scss'

interface Props {
	children: React.ReactNode
	primary?: boolean
}

const Button = ({ children, primary = false }: Props) => {
	return (
		<button
			className={primary ? `${styles.button} ${styles.primary}` : styles.button}
		>
			{children}
		</button>
	)
}

export default Button
