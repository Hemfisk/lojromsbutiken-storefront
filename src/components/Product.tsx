import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/styles/Product.module.scss'
import { parsePrice, parseWeight } from '@/utils/utils'
import Button from './Button'
import { addonBanner, addonRound } from './Addons'

interface Props {
	product: any
}

const Product = ({ product }: Props) => {
	const productData = product.node

	const collection = product.node.collections.nodes[0].handle
	const price = parsePrice(
		productData.priceRange.minVariantPrice.amount,
		collection,
		productData.variants.edges[0].node
	)
	const weight = parseWeight(productData.variants.edges[0].node)
	const imageSrc = productData.images.edges[0].node.transformedSrc
	const addon = product.node.addonType
		? { type: product.node.addonType.value, text: product.node.addonText.value }
		: null

	return (
		<div className={styles.product}>
			{addonRound(addon)}
			<div className={styles.product_container}>
				<Link
					href={`produkter/${productData.handle}`}
					className={styles.product_image_container}
				>
					<Image
						src={imageSrc}
						alt={productData.title}
						fill
						style={{ objectFit: 'cover' }}
						sizes='(min-width: 60em) 24vw,
					(min-width: 28em) 45vw,
					100vw'
					/>
				</Link>
				<div className={styles.product_info_container}>
					<h3
						style={
							addon && addon.type === 'round' ? { width: '65%' } : undefined
						}
					>
						{productData.title}
					</h3>
					{collection !== 'paket' ? <h4>{weight}</h4> : null}
					{addonBanner(addon)}
				</div>
			</div>
			<h4 className={styles.product_price}>{price}</h4>
			<Button
				clickCallback={() =>
					console.log('buy', productData.variants.edges[0].node.id)
				}
			>
				Köp
			</Button>
		</div>
	)
}

export default Product
