import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NextFont } from 'next/dist/compiled/@next/font'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import styles from '@/styles/Navbar.module.scss'

interface Props {
	fontFamily: NextFont
}

interface NavLinkProps {
	title: string
	handle: string
	active?: boolean
}

const NavLink = ({
	title,
	handle,
	active = false,
}: NavLinkProps): React.ReactElement => (
	<Link
		href={handle}
		title={title}
		className={
			active
				? `${styles.navigation_link} ${styles.active}`
				: styles.navigation_link
		}
	>
		{title}
	</Link>
)

const Navbar = ({ fontFamily }: Props) => {
	const navLinks = [
		{ title: 'Hem', handle: 'link', active: true },
		{ title: 'Om oss', handle: 'link' },
		{ title: 'Vårt sortiment', handle: 'link' },
		{ title: 'Recept', handle: 'link' },
		{ title: 'Jobba hos oss', handle: 'link' },
		{ title: 'Kontakt', handle: 'link' },
	]

	return (
		<div className={`${styles.navigation_container} ${fontFamily.className}`}>
			<div className={styles.navigation_content}>
				<div className={styles.mobile_menu_container}>
					<div
						tabIndex={0}
						onClick={() => console.log('mobile menu click')}
						className={styles.mobile_menu_button}
					>
						<MenuOutlinedIcon />
					</div>
				</div>
				<div className={styles.logo_container}>
					<Image src='/LOGO_dalafisk.png' alt='Dalafisk logotyp' fill />
				</div>
				<nav className={styles.navigation}>
					{navLinks.map((link) => (
						<NavLink
							key={link.handle}
							title={link.title}
							handle={link.handle}
							active={link.active}
						/>
					))}
				</nav>
				<div className={styles.cart_container}>
					<div
						tabIndex={0}
						onClick={() => console.log('cart click')}
						className={styles.cart_button}
					>
						<ShoppingCartOutlinedIcon />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
