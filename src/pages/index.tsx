import Head from 'next/head'

import { getAllGqlShopify, gqlShopify } from '@/pages/api/graphql'
import {
	GET_COLLECTIONS,
	GET_PAGE_CONTENT,
	GET_PRODUCTS,
	GET_SHOP_NAME,
} from '@/pages/api/queries'

import Hero from '@/components/Hero'
import ProductGrid from '@/components/ProductGrid'

const Home = ({
	shopInfo,
	deliveryContent,
	heroContent,
	collections,
	allProducts,
}: any) => {
	return (
		<>
			<Head>
				<title>{`${shopInfo.name} - ${shopInfo.brand.slogan}`}</title>
				<meta name='description' content={shopInfo.brand.shortDescription} />
			</Head>
			<Hero heroContent={heroContent} />
			<ProductGrid
				collections={collections}
				allProducts={allProducts}
				deliveryContent={deliveryContent}
			/>
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

	const allCollections = await gqlShopify(GET_COLLECTIONS, { amount: 5 })

	const allProducts = await Promise.all(
		allCollections.collections.edges.map((collection: any) => {
			return getAllGqlShopify(['collection', 'products'], GET_PRODUCTS, {
				collectionId: collection.node.id,
				amount: 20,
			})
		})
	)

	const gqlData = {
		shopInfo: shop.shop,
		deliveryContent: delivery.page,
		heroContent: hero.page,
		collections: allCollections.collections.edges,
		allProducts: []
			.concat(...allProducts)
			.filter(
				(v: any, i, a) =>
					a.findIndex((v2: any) => v2.node.id === v.node.id) === i
			),
	}

	return {
		props: { ...gqlData },
	}
}

export default Home
