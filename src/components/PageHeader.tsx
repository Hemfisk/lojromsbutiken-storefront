import React from 'react'

import styles from '@/styles/PageHeader.module.scss'

interface Props {
	children: React.ReactNode
	noPadding: boolean
}

const PageHeader = ({ children, noPadding = false }: Props) => {
	return (
		<h1
			className={`${styles.page_header}${noPadding ? styles.no_padding : ''}`}
		>
			{children}
		</h1>
	)
}

export default PageHeader
