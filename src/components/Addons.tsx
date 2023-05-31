import React from 'react'

import styles from '@/styles/Addons.module.scss'

export const addonRound = (
	addon: { type: string; text: string } | null,
	style?: React.CSSProperties
) => {
	if (addon && addon.type === 'round') {
		return (
			<div className={`${styles.product_addon} ${styles.round}`} style={style}>
				{addon.text}
			</div>
		)
	}
	return null
}

export const addonBanner = (
	addon: { type: string; text: string } | null,
	style?: React.CSSProperties
) => {
	if (addon && addon.type === 'banner') {
		return (
			<div className={`${styles.product_addon} ${styles.banner}`} style={style}>
				{addon.text}
			</div>
		)
	}
	return null
}
