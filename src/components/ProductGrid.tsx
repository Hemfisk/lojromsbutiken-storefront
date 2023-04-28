import React from 'react'

import styles from '@/styles/Layout.module.scss'
import { useWindowSize } from '@/utils/hooks'
import Button from './Button'
import Search from './Search'

const ProductGrid = () => {
	const [width] = useWindowSize()
	return (
		<div className={styles.container}>
			<div className={`${styles.flex_row} ${styles.gap_large}`}>
				<div className={`${styles.flex_row} ${styles.collapse_mobile}`}>
					{width <= 960 ? (
						<Button primary>Alla produkter</Button>
					) : (
						<>
							<Button primary>Alla produkter</Button>
							<Button>Fisk</Button>
							<Button>Skaldjur</Button>
							<Button>Paket</Button>
						</>
					)}
				</div>
				<Search />
			</div>
		</div>
	)
}

export default ProductGrid
