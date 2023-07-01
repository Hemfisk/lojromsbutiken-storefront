import Head from 'next/head'

import { getAllGqlShopify, gqlShopify } from '@/pages/api/graphql'
import {
	GET_COLLECTIONS,
	GET_PAGE_CONTENT,
	GET_PAYMENT_METHODS,
	GET_PRODUCTS,
	GET_SHOP_NAME,
} from '@/pages/api/queries'
import { generateImageSrcFromString } from '@/utils/utils'

import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'
import { readFileFromUrl } from './api/files'

const Home = ({
	shopInfo,
	deliveryContent,
	heroContent,
	heroImage,
	zipCodes,
	collections,
	allProducts,
}: any) => {
	return (
		<>
			<Head>
				<title>{`${shopInfo.name} - ${shopInfo.brand.slogan}`}</title>
				<meta name='description' content={shopInfo.brand.shortDescription} />
			</Head>
			<Hero
				deliveryContent={deliveryContent}
				heroContent={heroContent}
				heroImage={heroImage}
				zipCodes={zipCodes}
			/>
			<ProductGrid collections={collections} allProducts={allProducts} />
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const delivery = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'kan-vi-leverera',
	})

	const hero = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'hero',
	})

	const heroImage = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'hero-image',
	})

	const allCollections = await gqlShopify(GET_COLLECTIONS, { amount: 5 })

	const allProducts = await Promise.all(
		allCollections.collections.edges.map((collection: any) => {
			return getAllGqlShopify(['collection', 'products'], GET_PRODUCTS, {
				collectionId: collection.node.id,
				amount: 20,
			})
		})
	)

	const gordonZipCodes = await readFileFromUrl(
		'https://cdn.shopify.com/s/files/1/0751/0743/4787/files/gordon_postnr.csv'
	)

	const dalafiskZipCodes = await readFileFromUrl(
		'https://cdn.shopify.com/s/files/1/0751/0743/4787/files/dalafisk_postnr.csv'
	)

	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const gqlData = {
		shopInfo: shop.shop,
		deliveryContent: delivery.page,
		heroContent: hero.page,
		heroImage: generateImageSrcFromString(heroImage.page.body),
		zipCodes: { gordonZipCodes, dalafiskZipCodes },
		collections: allCollections.collections.edges,
		allProducts: []
			.concat(...allProducts)
			.filter(
				(v: any, i, a) =>
					a.findIndex((v2: any) => v2.node.id === v.node.id) === i
			),
		paymentMethods: paymentMethods.shop.paymentSettings,
	}

	return {
		props: { ...gqlData },
	}
}

export default Home
