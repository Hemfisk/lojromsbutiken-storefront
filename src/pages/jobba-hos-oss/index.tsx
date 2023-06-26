import Head from 'next/head'

import { gqlShopify } from '@/pages/api/graphql'
import {
	GET_PAGE_CONTENT,
	GET_PAYMENT_METHODS,
	GET_SHOP_NAME,
} from '@/pages/api/queries'

import PageContent from '@/components/PageContent'
import { getPageDescription } from '@/utils/utils'

const Work = ({ shopInfo, workContent }: any) => {
	const title = `${shopInfo.name} - ${shopInfo.brand.slogan} | ${workContent.page.title}`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content={getPageDescription(workContent?.page?.body)}
				/>
			</Head>
			<PageContent content={workContent} />
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const workContent = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'jobba-hos-oss',
	})

	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const gqlData = {
		shopInfo: shop.shop,
		workContent,
		paymentMethods: paymentMethods.shop.paymentSettings,
	}

	return {
		props: { ...gqlData },
	}
}

export default Work
