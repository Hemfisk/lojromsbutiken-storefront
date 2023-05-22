import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextFont } from 'next/dist/compiled/@next/font'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import styles from '@/styles/Navigation.module.scss'

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
	const [mobileNavigationOpen, setMobileNavigationOpen] = useState(false)

	const router = useRouter()

	useEffect(() => {
		router.events.on('routeChangeComplete', () => {
			setMobileNavigationOpen(false)
		})
	}, [router.events])

	useEffect(() => {
		setActive(currentPage)
	}, [currentPage])

	const mobileNavigation = () => {
		if (!mobileNavigationOpen) {
			return null
		}

		return (
			<>
				<div className={`${styles.mobile_navigation}  ${fontFamily.className}`}>
					<div
						tabIndex={0}
						onClick={() => setMobileNavigationOpen((prevState) => !prevState)}
						className={styles.mobile_menu_button}
					>
						<CloseOutlinedIcon />
					</div>
					<div className={styles.navigation}>
						{navigation.map((link) => (
							<NavLink
								key={`${link.handle}_mobile`}
								title={link.title}
								handle={link.handle}
								active={active === link.handle}
							/>
						))}
					</div>
				</div>
				<div
					className={styles.mobile_navigation_blur}
					onClick={() => setMobileNavigationOpen((prevState) => !prevState)}
				/>
			</>
		)
	}

	return (
		<>
			{mobileNavigation()}
			<div className={`${styles.navigation_container} ${fontFamily.className}`}>
				<div className={styles.navigation_content}>
					<div className={styles.mobile_menu_container}>
						<div
							tabIndex={0}
							onClick={() => setMobileNavigationOpen((prevState) => !prevState)}
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
		</>
	)
}

export default Navbar
