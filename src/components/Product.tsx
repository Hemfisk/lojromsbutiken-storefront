import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/styles/Product.module.scss'
import { parsePrice, parseWeight } from '@/utils/utils'
import Button from './Button'
import { addonBanner, addonRound } from './Addons'
import InfoIcon from './InfoIcon'

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
	const infoData = [
		{ type: 'latin', value: productData.infoLatin?.value },
		{ type: 'fangst', value: productData.infoFangst?.value },
		{ type: 'tillstand', value: productData.infoTillstand?.value },
		{ type: 'storlek', value: productData.infoStorlek?.value },
		{ type: 'hallbarhet', value: productData.infoHallbarhet?.value },
		{ type: 'tillagning', value: productData.infoTillagning?.value },
	]
		.filter((info) => info.value !== undefined)
		.slice(0, 3)

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
			<div className={styles.product_info_icons}>
				{infoData.map((info) => (
					<InfoIcon key={info.type} type={info.type} title={info.value} />
				))}
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
