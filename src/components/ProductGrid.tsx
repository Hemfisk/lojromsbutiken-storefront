import React, { useRef, useState } from 'react'
import { debounce } from 'lodash'

import layout from '@/styles/Layout.module.scss'
import styles from '@/styles/ProductGrid.module.scss'
import { useWindowSize } from '@/utils/hooks'
import Button from './Button'
import Search from './Search'
import Product from './Product'

const ProductGrid = ({ collections, allProducts }: any) => {
	const [width] = useWindowSize()
	const [selectedCollection, setSelectedCollection] = useState<string | null>(
		null
	)
	const [showSelectModal, setShowSelectModal] = useState(false)
	const [productSearch, setProductSearch] = useState<string>('')

	const productsByCollection = collections.map((collection: any) => {
		collection.products = allProducts?.filter((product: any) => {
			return product.node.collections.nodes[0].handle === collection.node.handle
		})
		return collection
	})

	const toggleCollection = (handle: string | null) => {
		setSelectedCollection(handle)
	}

	const SelectModal = () => {
		return (
			<div
				className={styles.select_modal_container}
				onClick={() => setShowSelectModal(false)}
			>
				<div className={styles.select_modal}>
					<Button
						primary={!selectedCollection}
						background={!!selectedCollection}
						clickCallback={() => {
							toggleCollection(null)
							setShowSelectModal(false)
						}}
					>
						Alla produkter
					</Button>
					{collections.map((collection: any) => (
						<Button
							primary={selectedCollection === collection.node.handle}
							background={selectedCollection !== collection.node.handle}
							key={collection.node.handle}
							clickCallback={() => {
								toggleCollection(collection.node.handle)
								setShowSelectModal(false)
							}}
						>
							{collection.node.title}
						</Button>
					))}
				</div>
			</div>
		)
	}

	const productsGrid = (productsToDisplay: any[]) => (
		<div className={layout.grid_container}>
			{productsToDisplay.map((product: any) => (
				<Product key={product.node.handle} productData={product.node} />
			))}
		</div>
	)

	const productSearchHandler = useRef(
		debounce((e) => {
			setProductSearch(e?.target?.value)
		}, 300)
	)

	const renderProducts = () => {
		if (selectedCollection) {
			if (productSearch) {
				const filteredProducts = productsByCollection
					.find(
						(collection: any) => collection.node.handle === selectedCollection
					)
					.products.filter((product: any) =>
						product.node.title
							.toLowerCase()
							.includes(productSearch.toLowerCase())
					)

				if (filteredProducts?.length) {
					return productsGrid(filteredProducts)
				} else {
					return (
						<div className={styles.no_products_message}>
							<h5>Tyvärr, inga produkter matchade din sökning</h5>
						</div>
					)
				}
			} else {
				const filteredProducts = productsByCollection.find(
					(collection: any) => collection.node.handle === selectedCollection
				).products

				if (filteredProducts?.length) {
					return productsGrid(filteredProducts)
				} else {
					return (
						<div className={styles.no_products_message}>
							<h5>Tyvärr gick det inte att hitta några produkter</h5>
						</div>
					)
				}
			}
		} else {
			if (productSearch) {
				const filteredProducts = allProducts.filter((product: any) =>
					product.node.title.toLowerCase().includes(productSearch.toLowerCase())
				)
				if (filteredProducts.length) {
					return productsGrid(filteredProducts)
				} else {
					return (
						<div className={styles.no_products_message}>
							<h5>Tyvärr, inga produkter matchade din sökning</h5>
						</div>
					)
				}
			} else {
				if (allProducts?.length) {
					return productsGrid(allProducts)
				} else {
					return (
						<div className={styles.no_products_message}>
							<h5>Tyvärr gick det inte att hitta några produkter</h5>
						</div>
					)
				}
			}
		}
	}

	return (
		<div className={layout.container}>
			<div className={`${layout.flex_row} ${layout.gap_large}`}>
				<div className={`${layout.flex_row} ${layout.collapse_mobile}`}>
					{width <= 960 ? (
						<>
							<Button primary clickCallback={() => setShowSelectModal(true)}>
								{selectedCollection || 'Alla produkter'}
							</Button>
							{showSelectModal ? <SelectModal /> : null}
						</>
					) : (
						<>
							<Button
								primary={!selectedCollection}
								clickCallback={() => toggleCollection(null)}
							>
								Alla produkter
							</Button>
							{collections.map((collection: any) => (
								<Button
									primary={selectedCollection === collection.node.handle}
									key={collection.node.handle}
									clickCallback={() => toggleCollection(collection.node.handle)}
								>
									{collection.node.title}
								</Button>
							))}
						</>
					)}
				</div>
				<Search changeCallback={(e: any) => productSearchHandler.current(e)} />
			</div>
			{renderProducts()}
		</div>
	)
}

export default ProductGrid
