import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CircularProgress } from '@mui/material'

import styles from '@/styles/Product.module.scss'
import { parsePrice } from '@/utils/utils'
import Button from './Button'
import { addonBanner, addonRound } from './Addons'
import InfoIcon from './InfoIcon'
import { useCart } from '@/context/state'
import { addToCart } from '@/utils/cartUtils'

import asc from '@/static/asc_logo.png'
import krav from '@/static/krav_logo.png'
import msc from '@/static/msc_logo.png'
interface Props {
	productData: any
}

const getCheapestVariant = (variants: any[]) => {
	const weightPrices: any = []
	variants.forEach((variant) => {
		switch (variant.weightUnit) {
			case 'KILOGRAMS':
				weightPrices.push(
					parseInt(variant.node.price.amount) / variant.node.weight
				)
				break
			case 'GRAMS':
				weightPrices.push(
					parseInt(variant.node.price.amount) / (variant.node.weight / 1000)
				)
				break
			default:
				weightPrices.push(
					parseInt(variant.node.price.amount) / variant.node.weight
				)
				break
		}
	})
	const minimum = Math.min(...weightPrices)
	return weightPrices.indexOf(minimum)
}

const Product = ({ productData }: Props) => {
	const [loading, setLoading] = useState(false)

	const { cartId, items, updateCartId, updateCartItems } = useCart()

	const cheapestVariant = getCheapestVariant(productData.variants.edges)

	const collection = productData.collections.nodes[0].handle
	const price = parsePrice(
		productData.variants.edges[cheapestVariant].node.price.amount,
		collection,
		productData.variants.edges[cheapestVariant].node
	)
	const imageSrc = productData.images.edges[0].node.transformedSrc
	const addon = productData.addonType
		? { type: productData.addonType?.value, text: productData.addonText?.value }
		: null
	const infoData = [
		{ type: 'latin', value: productData.infoLatin?.value },
		{ type: 'fangst', value: productData.infoFangst?.value },
		{ type: 'tillstand', value: productData.infoTillstand?.value },
		{ type: 'storlek', value: productData.infoStorlek?.value },
		{ type: 'hallbarhet', value: productData.infoHallbarhet?.value },
		{ type: 'tillagning', value: productData.infoTillagning?.value },
		{ type: 'benfri', value: productData.infoBenfri?.value },
		{ type: 'leverans', value: productData.infoLeverans?.value },
	]
		.filter((info) => info.value !== undefined)
		.slice(0, 3)

	const certs = productData.certProduct?.value
		? [
				{ type: 'msc', value: productData.certMSC?.value, src: msc },
				{ type: 'krav', value: productData.certKrav?.value, src: krav },
				{ type: 'asc', value: productData.certASC?.value, src: asc },
		  ].filter(
				(cert) =>
					cert.type ===
					JSON.parse(productData.certProduct?.value)[0].toLowerCase()
		  )
		: []

	return (
		<div className={styles.product}>
			{addonRound(addon)}
			<div className={styles.product_container}>
				<Link
					href={`/produkter/${productData.handle}`}
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
					{addonBanner(addon)}
					<div className={styles.certs_container}>
						{certs.map((cert) => (
							<Image
								src={cert.src}
								alt={`${cert.type} logotyp`}
								key={cert.type}
								sizes='(min-width: 60em) 24vw,
												(min-width: 28em) 45vw,
												100vw'
								priority
							/>
						))}
					</div>
				</div>
			</div>
			<div className={styles.title_container}>
				<h3>{productData.title}</h3>
			</div>
			<div className={styles.product_info_icons}>
				{infoData.map((info) => (
					<InfoIcon key={info.type} type={info.type} title={info.value} />
				))}
			</div>
			<h4 className={styles.product_price}>
				<span>från </span>
				{price}
			</h4>
			<Button
				clickCallback={async () => {
					setLoading(true)

					addToCart(
						productData.variants.edges[cheapestVariant].node.id,
						cartId,
						items,
						updateCartId,
						updateCartItems
					).then(() => {
						setLoading(false)
					})
				}}
				disabled={loading}
			>
				Köp
			</Button>
			{loading ? (
				<div className={styles.load_container}>
					<CircularProgress disableShrink />
				</div>
			) : null}
		</div>
	)
}

export default Product
