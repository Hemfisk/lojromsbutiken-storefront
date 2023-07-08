import Head from 'next/head'

import { getAllGqlShopify, gqlShopify } from '@/pages/api/graphql'
import { GET_RECIPES, GET_SHOP_NAME } from '@/pages/api/queries'

import layout from '@/styles/Layout.module.scss'
import PageHeader from '@/components/PageHeader'
import Recipe from '@/components/Recipe'
import { getPageDescription } from '@/utils/utils'

const Recipes = ({ shopInfo, allRecipies }: any) => {
	const title = `${shopInfo.name} - ${shopInfo.brand.slogan} | Recept`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content={getPageDescription(shopInfo.brand.shortDescription)}
				/>
			</Head>
			<PageHeader>Recept</PageHeader>
			<div className={layout.container}>
				<div className={layout.grid_container}>
					{allRecipies.map((recipe: any) => (
						<Recipe key={recipe.node.handle} recipe={recipe} />
					))}
				</div>
			</div>
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const allRecipies = await getAllGqlShopify('articles', GET_RECIPES, {
		amount: 20,
	})

	const gqlData = {
		shopInfo: shop.shop,
		allRecipies: allRecipies,
	}

	return {
		props: { ...gqlData },
	}
}

export default Recipes
