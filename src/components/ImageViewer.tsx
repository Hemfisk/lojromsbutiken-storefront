import React, { useState } from 'react'

import Image from 'next/image'

import styles from '@/styles/ImageViewer.module.scss'
import { addonBanner, addonRound } from './Addons'

interface Props {
	images: any
	productTitle: string
	addon: { type: string; text: string } | null
}

const ImageViewer = ({ images, productTitle, addon = null }: Props) => {
	const [image, setImage] = useState(images?.edges[0]?.node?.transformedSrc)

	const imageSelector = () => {
		if (images?.edges?.length > 1) {
			return (
				<div className={styles.image_selector}>
					{images.edges.map((edge: any, index: number) => {
						const selected = image === edge.node.transformedSrc
						return (
							<div
								key={`image_${index}`}
								className={`${styles.image_container} ${
									selected ? styles.selected : ''
								}`}
								onClick={() => setImage(edge.node.transformedSrc)}
							>
								<Image
									src={edge.node.transformedSrc}
									alt={productTitle}
									fill
									style={{ objectFit: 'cover' }}
									sizes='(min-width: 60em) 12vw, (min-width: 28em) 45vw, 50vw'
								/>
							</div>
						)
					})}
				</div>
			)
		}
		return null
	}

	return (
		<div className={styles.image_viewer}>
			{addonRound(addon, { left: '-2em', right: 'auto' })}
			<div className={styles.image_container}>
				<Image
					src={image}
					alt={productTitle}
					fill
					style={{ objectFit: 'cover' }}
					sizes='(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw'
				/>
				{addonBanner(addon, { right: '-34%', bottom: '16%' })}
			</div>
			{imageSelector()}
		</div>
	)
}

export default ImageViewer
