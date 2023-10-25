import React from 'react'

import styles from '@/styles/ZipCodeCheck.module.scss'

const ZipCodeCheck = ({ deliveryContent }: any) => {
	if (deliveryContent) {
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
					<div className={styles.delivery_content} />
				</div>
			</div>
		)
	}
	return null
}

export default ZipCodeCheck
