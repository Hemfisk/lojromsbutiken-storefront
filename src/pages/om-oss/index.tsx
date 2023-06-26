import Head from 'next/head'

import { gqlShopify } from '@/pages/api/graphql'
import {
	GET_PAGE_CONTENT,
	GET_PAYMENT_METHODS,
	GET_SHOP_NAME,
} from '@/pages/api/queries'

import PageContent from '@/components/PageContent'
import { getPageDescription } from '@/utils/utils'

const AboutUs = ({ shopInfo, aboutUsContent }: any) => {
	const title = `${shopInfo.name} - ${shopInfo.brand.slogan} | ${aboutUsContent.page.title}`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content={getPageDescription(aboutUsContent?.page?.body)}
				/>
			</Head>
			<PageContent content={aboutUsContent} />
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const aboutUsContent = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'om-oss',
	})

	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const gqlData = {
		shopInfo: shop.shop,
		aboutUsContent,
		paymentMethods: paymentMethods.shop.paymentSettings,
	}

	return {
		props: { ...gqlData },
	}
}

export default AboutUs
