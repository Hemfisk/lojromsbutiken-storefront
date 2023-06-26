import Head from 'next/head'

import { gqlShopify } from '@/pages/api/graphql'
import {
	GET_PAYMENT_METHODS,
	GET_POLICY,
	GET_SHOP_NAME,
} from '@/pages/api/queries'

import PageContent from '@/components/PageContent'
import PageHeader from '@/components/PageHeader'
import { getPageDescription } from '@/utils/utils'

const Policies = ({ shopInfo, policyContent }: any) => {
	const title = `${shopInfo.name} - ${shopInfo.brand.slogan} | Leverans- och köpvillkor`

	delete policyContent.privacyPolicy

	const policyOrder = {
		shippingPolicy: null,
	}

	const policies = Object.keys(Object.assign(policyOrder, policyContent))

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content={getPageDescription(policyContent?.shippingPolicy?.body)}
				/>
			</Head>
			<PageHeader>Leverans- och köpvillkor</PageHeader>
			{policies.map((policyKey: string) => {
				const policy = policyContent[policyKey]
				if (policy?.body) {
					return (
						<PageContent key={policyKey} contentOnly content={policy?.body} />
					)
				}
				return null
			})}
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const policyContent = await gqlShopify(GET_POLICY, {})

	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const gqlData = {
		shopInfo: shop.shop,
		policyContent: policyContent.shop,
		paymentMethods: paymentMethods.shop.paymentSettings,
	}

	return {
		props: { ...gqlData },
	}
}

export default Policies
