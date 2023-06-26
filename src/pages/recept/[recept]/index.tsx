import Head from 'next/head'

import { gqlShopify } from '@/pages/api/graphql'
import {
	GET_PAYMENT_METHODS,
	GET_PRODUCT_BY_ID,
	GET_RECIPE,
	GET_SHOP_NAME,
} from '@/pages/api/queries'

import layout from '@/styles/Layout.module.scss'
import styles from '@/styles/RecipePage.module.scss'
import PageHeader from '@/components/PageHeader'
import { getPageDescription, parseHtml } from '@/utils/utils'
import ImageViewer from '@/components/ImageViewer'
import PageContent from '@/components/PageContent'
import Product from '@/components/Product'

const RecipePage = ({ shopInfo, recipe, products }: any) => {
	const title = `${shopInfo.name} - ${shopInfo.brand.slogan} | Recept - ${recipe.title}`
	const ingredients = recipe.ingredients?.value
		? parseHtml(JSON.parse(recipe.ingredients?.value))
		: ''

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content={getPageDescription(recipe.contentHtml)}
				/>
			</Head>
			<div className={`${layout.container} ${layout.no_top_margin}`}>
				<div className={layout.wrapped_container}>
					<PageHeader leftAlign style={{ marginBottom: '1em' }}>
						{recipe.title}
					</PageHeader>
				</div>
				<div className={`${layout.three_column_grid} ${layout.big_left}`}>
					<ImageViewer
						imageSrc={recipe.image.transformedSrc}
						productTitle={recipe.title}
					/>
					<div className={styles.ingredients_container}>
						<h4>Ingredienser</h4>
						<div
							dangerouslySetInnerHTML={{
								__html: ingredients,
							}}
						/>
					</div>
				</div>
			</div>
			<PageContent contentOnly maxWidth content={recipe.contentHtml} />
			<div className={`${layout.container} ${layout.no_top_margin}`}>
				{products ? (
					<>
						<div className={layout.wrapped_container}>
							<PageHeader noPadding heading='h2'>
								Relaterade produkter
							</PageHeader>
						</div>
						<div
							className={`${layout.grid_container} ${layout.wrapped_container}`}
						>
							{products?.map((productData: any) => (
								<Product
									key={productData.product.handle}
									productData={productData.product}
								/>
							))}
						</div>
					</>
				) : null}
			</div>
		</>
	)
}

export const getServerSideProps = async (context: any) => {
	const { recept } = context.query

	const recipe = await gqlShopify(GET_RECIPE, { handle: recept })

	const allProducts = recipe.blog.articleByHandle?.products?.value
		? await Promise.all(
				JSON.parse(recipe.blog.articleByHandle.products?.value).map(
					(productId: string) =>
						gqlShopify(GET_PRODUCT_BY_ID, { id: productId })
				)
		  )
		: null

	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const gqlData = {
		shopInfo: shop.shop,
		recipe: recipe.blog.articleByHandle,
		products:
			allProducts && allProducts[0]?.product !== null ? allProducts : null,
		paymentMethods: paymentMethods.shop.paymentSettings,
	}

	return {
		props: { ...gqlData },
	}
}

export default RecipePage
