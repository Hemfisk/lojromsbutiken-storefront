import React from 'react'

import styles from '@/styles/PageHeader.module.scss'

interface Props {
	children: React.ReactNode
	noPadding?: boolean
	leftAlign?: boolean
	style?: React.CSSProperties
	heading?: 'h1' | 'h2' | 'h3' | 'h4'
}

const PageHeader = ({
	children,
	noPadding = false,
	leftAlign = false,
	style = {},
	heading = 'h1',
}: Props) => {
	switch (heading) {
		case 'h1':
			return (
				<h1
					className={`${styles.page_header} ${
						noPadding ? styles.no_padding : ''
					} ${leftAlign ? styles.left_align : ''}`}
					style={style}
				>
					{children}
				</h1>
			)

		case 'h2':
			return (
				<h2
					className={`${styles.page_header} ${
						noPadding ? styles.no_padding : ''
					}`}
					style={style}
				>
					{children}
				</h2>
			)

		default:
			return (
				<h1
					className={`${styles.page_header} ${
						noPadding ? styles.no_padding : ''
					} ${leftAlign ? styles.left_align : ''}`}
					style={style}
				>
					{children}
				</h1>
			)
	}
}

export default PageHeader
