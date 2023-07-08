import Head from 'next/head'
import type { AppProps } from 'next/app'

import Layout from '@/components/layout/Layout'
import '@/styles/globals.scss'
import { CartProvider } from '@/context/state'

import { gqlShopify } from './api/graphql'
import { GET_PAGE_CONTENT, GET_PAYMENT_METHODS } from './api/queries'

type InitialProps = {
	paymentMethods: any
	contactInfo: any
}

const App = ({
	Component,
	pageProps,
	paymentMethods,
	contactInfo,
}: AppProps & InitialProps) => {
	return (
		<CartProvider>
			<Layout paymentMethods={paymentMethods} contactInfo={contactInfo}>
				<Head>
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1.0, maximum-scale=1", viewport-fit=cover'
					/>
					<link rel='shortcut icon' href='/favicons/favicon.ico' />
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/favicons/apple-touch-icon.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/favicons/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/favicons/favicon-16x16.png'
					/>
					<link rel='manifest' href='/favicons/site.webmanifest' />
					<link
						rel='mask-icon'
						href='/favicons/safari-pinned-tab.svg'
						color='#264480'
					/>
					<meta name='msapplication-TileColor' content='#ffffff' />
					<meta
						name='msapplication-config'
						content='/favicons/browserconfig.xml'
					/>
					<meta name='theme-color' content='#ffffff' />
				</Head>
				<Component {...pageProps} />
			</Layout>
		</CartProvider>
	)
}

App.getInitialProps = async () => {
	const paymentMethods = await gqlShopify(GET_PAYMENT_METHODS, {})

	const contactInfo = await gqlShopify(GET_PAGE_CONTENT, {
		handle: 'kontaktinfo',
	})

	return {
		paymentMethods: paymentMethods.shop.paymentSettings,
		contactInfo: contactInfo.page,
	}
}

export default App
