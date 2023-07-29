import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextFont } from 'next/dist/compiled/@next/font'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import styles from '@/styles/Navigation.module.scss'
import { useCart } from '@/context/state'
import { getCart, updateCart } from '@/utils/cartUtils'
import { gqlShopify } from '@/pages/api/graphql'
import { GET_CART } from '@/pages/api/queries'

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
	const [overHero, setOverHero] = useState(true)

	const { items, cartId, updateCartId, updateCartItems } = useCart()

	const router = useRouter()

	useEffect(() => {
		router.events.on('routeChangeComplete', () =>
			setMobileNavigationOpen(false)
		)
	}, [router.events])

	useEffect(() => {
		setActive(currentPage)
	}, [currentPage])

	useEffect(() => {
		getCart(updateCartId, updateCartItems)

		if (items && items > 0) {
			gqlShopify(GET_CART, { cartId: cartId }).then(async (result) => {
				if (!result.cart || result.cart.totalQuantity === 0) {
					updateCart(updateCartId, updateCartItems)
				}
			})
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartId, items, updateCartId, updateCartItems])

	useEffect(() => {
		const onScroll = (): void => {
			const heroSection = document.querySelector('#hero-section')
			if (heroSection) {
				const heroSectionRect = heroSection.getBoundingClientRect()
				if (Math.abs(heroSectionRect.y) < heroSectionRect.height * 0.8) {
					setOverHero(true)
				} else {
					setOverHero(false)
				}
			}
		}

		onScroll()

		window.removeEventListener('scroll', onScroll)
		window.addEventListener('scroll', onScroll, { passive: true })

		return () => window.removeEventListener('scroll', onScroll)
	}, [])

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
			<div
				className={`${styles.navigation_container} ${fontFamily.className} ${
					currentPage === '/' && overHero ? styles.over_hero : ''
				}`}
			>
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
						<Link tabIndex={0} href='/kundvagn' className={styles.cart_button}>
							{items && items > 0 ? (
								<div className={styles.cart_number}>{items}</div>
							) : null}
							<ShoppingCartOutlinedIcon />
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
