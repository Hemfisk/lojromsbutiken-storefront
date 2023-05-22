import React from 'react'
import { useRouter } from 'next/router'
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

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
	{ title: 'Hem', handle: '/' },
	{ title: 'Om oss', handle: '/om-oss' },
	{ title: 'Vårt sortiment', handle: '/vart-sortiment' },
	{ title: 'Recept', handle: 'link4' },
	{ title: 'Jobba hos oss', handle: '/jobba-hos-oss' },
	{ title: 'Kontakt', handle: '/kontakt' },
]

const footerNavigation = [
	{ title: 'Integritetspolicy', handle: 'link7' },
	{ title: 'Köpvillkor', handle: 'link8' },
	{ title: 'Leveransvillkor', handle: 'link9' },
]

const Layout = ({ children, paymentMethods }: Props) => {
	const router = useRouter()

	return (
		<>
			<ToastContainer
				style={{
					fontSize: '0.9rem',
					lineHeight: '1.5em',
					fontFamily: 'inherit',
				}}
			/>
			<Navbar
				fontFamily={poppins}
				navigation={navigation}
				currentPage={router.pathname}
			/>
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
