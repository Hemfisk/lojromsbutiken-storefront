import React from 'react'

import Navbar from './Navbar'
import Footer from './Footer'

interface Props {
	children: React.ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	)
}

export default Layout
