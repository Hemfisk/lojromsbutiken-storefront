import Head from 'next/head'

import { gqlShopify } from '@/pages/api/graphql'
import { GET_PAGE_CONTENT, GET_SHOP_NAME } from '@/pages/api/queries'

import layout from '@/styles/Layout.module.scss'
import styles from '@/styles/FAQ.module.scss'
import PageHeader from '@/components/PageHeader'

const FAQ = ({ shopInfo, faqContent }: any) => {
	const title = `${shopInfo.name} - ${shopInfo.brand.slogan} | ${faqContent.page.title}`

	let faqHTML = ''

	const faqList = faqContent.page.body
		.replace('<meta charset="utf-8">', '')
		.replaceAll('\n', '')
		.replaceAll('<ul>', '')
		.replaceAll('</ul>', '')
		.split('<li>')
		.filter((item: string) => item.length)

	for (var i = 0; i < faqList.length; i++) {
		const string = faqList[i].replace('</li>', '')
		if (i % 2 == 0) {
			faqHTML += `<div><details><summary>${string}</summary>`
		} else {
			faqHTML += `<p>${string}</p></details></div>`
		}
	}

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name='description' content={shopInfo.brand.shortDescription} />
			</Head>
			<PageHeader>{faqContent.page.title}</PageHeader>
			<div
				className={`${layout.container} ${layout.no_top_margin}  ${styles.faq}`}
			>
				<div
					className={layout.two_column_grid}
					dangerouslySetInnerHTML={{ __html: faqHTML }}
				/>
			</div>
		</>
	)
}

export const getServerSideProps = async () => {
	const shop = await gqlShopify(GET_SHOP_NAME, {})

	const faqContent = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'faq',
	})

	const gqlData = {
		shopInfo: shop.shop,
		faqContent,
	}

	return {
		props: { ...gqlData },
	}
}

export default FAQ
