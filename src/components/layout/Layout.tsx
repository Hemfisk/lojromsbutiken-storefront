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
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Navbar fontFamily={poppins} />
			<main className={`${styles.main} ${poppins.className}`}>{children}</main>
			<Footer fontFamily={poppins} />
		</>
	)
}

export default Layout
