import Head from 'next/head'

import { getAllGqlShopify, gqlShopify } from '@/pages/api/graphql'
import {
	GET_COLLECTIONS,
	GET_PAYMENT_METHODS,
	GET_PRODUCTS,
	GET_SHOP_NAME,
} from '@/pages/api/queries'

import ProductGrid from '@/components/ProductGrid'
import PageHeader from '@/components/PageHeader'
import { getPageDescription } from '@/utils/utils'

const Products = ({ shopInfo, collections, allProducts }: any) => {
	const title = `${shopInfo.name} - ${shopInfo.brand.slogan} | Vårt sortiment`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content={getPageDescription(shopInfo.brand.shortDescription)}
				/>
			</Head>
			<PageHeader>Vårt sortiment</PageHeader>
			<ProductGrid collections={collections} allProducts={allProducts} />
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const allCollections = await gqlShopify(GET_COLLECTIONS, { amount: 4 })

	const allProducts = await getAllGqlShopify('products', GET_PRODUCTS, {
		amount: 20,
	})

	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const gqlData = {
		shopInfo: shop.shop,
		collections: allCollections.collections.edges,
		allProducts: allProducts,
		paymentMethods: paymentMethods.shop.paymentSettings,
	}

	return {
		props: { ...gqlData },
	}
}

export default Products
