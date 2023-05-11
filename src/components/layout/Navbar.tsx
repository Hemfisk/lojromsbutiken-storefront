import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NextFont } from 'next/dist/compiled/@next/font'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'

import styles from '@/styles/Navbar.module.scss'

interface Props {
	fontFamily: NextFont
	navigation: {
		title: string
		handle: string
	}[]
	currentPage: string
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

const Navbar = ({ fontFamily, navigation, currentPage }: Props) => {
	const [active, setActive] = useState(currentPage || '')

	useEffect(() => {
		setActive(currentPage)
	}, [currentPage])

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
					<Link href='/' title='Dalafisk.se'>
						<Image
							src='/LOGO_dalafisk.png'
							alt='Dalafisk logotyp'
							fill
							sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
							priority
						/>
					</Link>
				</div>
				<nav className={styles.navigation}>
					{navigation.map((link) => (
						<NavLink
							key={link.handle}
							title={link.title}
							handle={link.handle}
							active={active === link.handle}
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
