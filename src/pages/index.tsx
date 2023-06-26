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

const Home = ({
	shopInfo,
	deliveryContent,
	heroContent,
	heroImage,
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
			/>
			<ProductGrid collections={collections} allProducts={allProducts} />
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})
	console.log(shop)
	const delivery = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'kan-vi-leverera',
	})

	const hero = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'hero',
	})

	const heroImage = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'hero-image',
	})

	const allCollections = await gqlShopify(GET_COLLECTIONS, { amount: 4 })

	const allProducts = await getAllGqlShopify('products', GET_PRODUCTS, {
		amount: 20,
	})

	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const gqlData = {
		shopInfo: shop.shop,
		deliveryContent: delivery.page,
		heroContent: hero.page,
		heroImage: generateImageSrcFromString(heroImage.page.body),
		collections: allCollections.collections.edges,
		allProducts: allProducts,
		paymentMethods: paymentMethods.shop.paymentSettings,
	}

	return {
		props: { ...gqlData },
	}
}

export default Home
