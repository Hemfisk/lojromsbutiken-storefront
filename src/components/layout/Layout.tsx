import React from 'react'
import { Poppins } from 'next/font/google'

import styles from '@/styles/Layout.module.scss'
import Navbar from './Navbar'
import Footer from './Footer'

const poppins = Poppins({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
})

interface Props {
	children: React.ReactNode
	paymentMethods: any
}

const navigation = [
	{ title: 'Hem', handle: 'link1', active: true },
	{ title: 'Om oss', handle: 'link2' },
	{ title: 'Vårt sortiment', handle: 'link3' },
	{ title: 'Recept', handle: 'link4' },
	{ title: 'Jobba hos oss', handle: 'link5' },
	{ title: 'Kontakt', handle: 'link6' },
]

const footerNavigation = [
	{ title: 'Integritetspolicy', handle: 'link7' },
	{ title: 'Köpvillkor', handle: 'link8' },
	{ title: 'Leveransvillkor', handle: 'link9' },
]

const Layout = ({ children, paymentMethods }: Props) => {
	return (
		<>
			<Navbar fontFamily={poppins} navigation={navigation} />
			<main className={`${styles.main} ${poppins.className}`}>{children}</main>
			<Footer
				fontFamily={poppins}
				navigation={footerNavigation}
				paymentMethods={paymentMethods}
			/>
		</>
	)
}

export default Layout
