import Head from 'next/head'

import { gqlShopify } from '@/pages/api/graphql'
import {
	GET_PAGE_CONTENT,
	GET_PAYMENT_METHODS,
	GET_SHOP_NAME,
} from '@/pages/api/queries'

import PageContent from '@/components/PageContent'
import ContactForm from '@/components/ContactForm'
import { getPageDescription } from '@/utils/utils'

const Contact = ({ shopInfo, contactContent }: any) => {
	const title = `${shopInfo.name} - ${shopInfo.brand.slogan} | ${contactContent.page.title}`

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content={getPageDescription(contactContent?.page?.body)}
				/>
			</Head>
			<PageContent content={contactContent} />
			<ContactForm />
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const contactContent = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'kontakt',
	})

	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const gqlData = {
		shopInfo: shop.shop,
		contactContent,
		paymentMethods: paymentMethods.shop.paymentSettings,
	}

	return {
		props: { ...gqlData },
	}
}

export default Contact
