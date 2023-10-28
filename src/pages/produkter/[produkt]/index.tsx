import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import RadioButtonUncheckedOutlined from '@mui/icons-material/RadioButtonUncheckedOutlined'
import RadioButtonCheckedOutlined from '@mui/icons-material/RadioButtonCheckedOutlined'
import { CircularProgress } from '@mui/material'

import { gqlShopify } from '@/pages/api/graphql'
import {
	GET_PRODUCT,
	GET_PRODUCT_BY_ID,
	GET_SHOP_NAME,
} from '@/pages/api/queries'
import {
	getPageDescription,
	parseHtml,
	parsePrice,
	parseWeight,
} from '@/utils/utils'

import layout from '@/styles/Layout.module.scss'
import styles from '@/styles/ProductPage.module.scss'
import PageHeader from '@/components/PageHeader'
import PageContent from '@/components/PageContent'
import ImageViewer from '@/components/ImageViewer'
import InfoIcon from '@/components/InfoIcon'
import Button from '@/components/Button'
import Product from '@/components/Product'
import { useCart } from '@/context/state'
import { addToCart } from '@/utils/cartUtils'

import asc from '@/static/asc_logo.png'
import krav from '@/static/krav_logo.png'
import msc from '@/static/msc_logo.png'
import sub from '@/static/sub_logo.png'

const ProductPage = ({ shopInfo, product, relatedProducts }: any) => {
	const [variantState, setVariantState] = useState(
		product.variants.edges[0].node
	)
	const [loading, setLoading] = useState(false)

	const { cartId, items, updateCartId, updateCartItems } = useCart()

	const title = `${shopInfo.name} - ${shopInfo.brand.slogan} | Produkter - ${product.title}`

	const collection = product.collections.nodes[0].handle
	const price = parsePrice(variantState.price.amount, 'fullPrice', variantState)
	const comparePrice = parsePrice(
		variantState.compareAtPrice?.amount,
		'fullPrice',
		variantState
	)
	const addon = product.addonType
		? { type: product.addonType.value, text: product.addonText.value }
		: null
	const weight = parseWeight(variantState).replace('.', ',')
	const infoData = [
		{ type: 'latin', value: product.infoLatin?.value },
		{ type: 'fangst', value: product.infoFangst?.value },
		{ type: 'storlek', value: product.infoStorlek?.value },
		{ type: 'hallbarhet', value: product.infoHallbarhet?.value },
		{ type: 'tillagning', value: product.infoTillagning?.value },
		{ type: 'tillstand', value: product.infoTillstand?.value },
		{ type: 'benfri', value: product.infoBenfri?.value },
		{ type: 'leverans', value: product.infoLeverans?.value },
	].filter((info) => info.value !== undefined)

	const certs = [
		{ type: 'msc', value: product.certMSC?.value, src: msc },
		{ type: 'krav', value: product.certKrav?.value, src: krav },
		{ type: 'asc', value: product.certASC?.value, src: asc },
		{ type: 'sub', value: product.certSUB?.value, src: sub },
	].filter((cert) => cert.value === 'true')

	const nutritionalContent = product.nutritionalContent?.value

	const NutritionalContent = () => {
		if (nutritionalContent) {
			return (
				<div className={`${layout.container} ${layout.no_top_margin}`}>
					<details className={styles.details}>
						<summary>Näringsinnehåll / Övrig information</summary>
						<div
							className={styles.details_content}
							dangerouslySetInnerHTML={{
								__html: parseHtml(JSON.parse(nutritionalContent)),
							}}
						/>
					</details>
				</div>
			)
		}
		return null
	}

	const ctaContent = () => {
		return (
			<>
				{product.variants?.edges?.length > 1 ? (
					<div className={styles.variants_container}>
						{product.variants.edges.map((variant: any) => {
							const selected = variant.node.id === variantState.id
							return (
								<div
									key={variant.node.id}
									className={`${styles.variant} ${
										selected ? styles.selected : ''
									}`}
									onClick={() => setVariantState(variant.node)}
								>
									<div className={styles.description_container}>
										{selected ? (
											<RadioButtonCheckedOutlined />
										) : (
											<RadioButtonUncheckedOutlined />
										)}
										<h4>{variant.node.title.replace('.', ',')}</h4>
										{variant.node.description ? (
											<span>{variant.node.description.value}</span>
										) : null}
									</div>
									<div className={styles.price}>
										{parsePrice(
											variant.node.price.amount,
											collection,
											variant.node
										)}
									</div>
								</div>
							)
						})}
					</div>
				) : null}
				<div
					className={`${styles.buy_container} ${loading ? styles.loading : ''}`}
				>
					<Button
						primary
						clickCallback={async () => {
							setLoading(true)

							addToCart(
								variantState.id,
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
						Lägg i varukorg
					</Button>
					{loading ? (
						<div className={styles.load_container}>
							<CircularProgress disableShrink />
						</div>
					) : null}
				</div>
			</>
		)
	}

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content={getPageDescription(product.descriptionHtml)}
				/>
			</Head>
			<div className={`${layout.container} ${layout.no_top_margin}`}>
				<div className={layout.two_column_grid}>
					<PageHeader leftAlign style={{ marginBottom: '1em' }}>
						{product.title}
					</PageHeader>
				</div>
				<div className={layout.three_column_grid}>
					<ImageViewer
						images={product.images}
						media={product.media}
						productTitle={product.title}
						addon={addon}
						certs={
							<div className={styles.certs_container}>
								{certs.map((cert) => (
									<div key={cert.type}>
										<Image
											src={cert.src}
											alt={`${cert.type} logotyp`}
											sizes='(min-width: 60em) 24vw,
												(min-width: 28em) 45vw,
												100vw'
											priority
										/>
									</div>
								))}
							</div>
						}
					/>
					<div className={`${styles.cta_container} ${styles.cta_mobile}`}>
						{ctaContent()}
					</div>
					<div className={styles.additional_info}>
						<div>
							<div className={styles.product_price}>
								<h2>{price}</h2>
								{variantState.compareAtPrice?.amount &&
								variantState.compareAtPrice?.amount !== '0.0' ? (
									<h3>{comparePrice}</h3>
								) : null}
							</div>
							{collection !== 'paket' ? (
								<h4>{weight}</h4>
							) : product.variants?.edges?.length > 1 ? (
								<h4>{variantState.title}</h4>
							) : null}
						</div>
						<div className={styles.info_container}>
							{infoData.map((info) => (
								<div key={info.type}>
									<InfoIcon type={info.type} />{' '}
									<span title={info.value}>{info.value}</span>
								</div>
							))}
						</div>
					</div>
					<div
						className={`${styles.cta_container} ${layout.wrapped_container} ${styles.cta_big_screen}`}
						style={
							product.variants?.edges?.length > 1
								? {}
								: { justifyContent: 'center' }
						}
					>
						{ctaContent()}
					</div>
				</div>
			</div>
			<div className={`${layout.container} ${layout.no_top_margin}`}>
				<div
					className={`${styles.cta_container} ${layout.wrapped_container} ${styles.cta_desktop}`}
				>
					{ctaContent()}
				</div>
			</div>
			<PageContent
				contentOnly
				maxWidth
				noMargin={nutritionalContent}
				content={product.descriptionHtml}
			/>
			<NutritionalContent />
			<div className={`${layout.container} ${layout.no_top_margin}`}>
				{relatedProducts ? (
					<>
						<div className={layout.wrapped_container}>
							<PageHeader noPadding heading='h2'>
								Andra har också köpt
							</PageHeader>
						</div>
						<div
							className={`${layout.grid_container} ${layout.wrapped_container}`}
						>
							{relatedProducts?.map(
								(productData: any) =>
									productData.product?.handle && (
										<Product
											key={productData.product.handle}
											productData={productData.product}
										/>
									)
							)}
						</div>
					</>
				) : null}
			</div>
		</>
	)
}

export const getServerSideProps = async (context: any) => {
	const { produkt } = context.query

	const product = await gqlShopify(GET_PRODUCT, { handle: produkt })

	const relatedProducts = product.productByHandle?.relatedProducts?.value
		? await Promise.all(
				JSON.parse(product.productByHandle?.relatedProducts?.value).map(
					(productId: string) =>
						gqlShopify(GET_PRODUCT_BY_ID, { id: productId })
				)
		  )
		: null

	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const gqlData = {
		shopInfo: shop.shop,
		product: product.productByHandle,
		relatedProducts,
	}

	return {
		props: { ...gqlData },
	}
}

export default ProductPage
