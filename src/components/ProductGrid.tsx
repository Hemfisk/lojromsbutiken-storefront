import React, { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

import layout from '@/styles/Layout.module.scss'
import styles from '@/styles/ProductGrid.module.scss'
import { useWindowSize } from '@/utils/hooks'
import Button from './Button'
import Search from './Search'
import Product from './Product'
import ZipCodeCheck from './ZipCodeCheck'

interface Props {
	collections: any
	allProducts: any
	deliveryContent?: any
	zipCodes?: any
	initialCollection?: string | null
}

const ProductGrid = ({
	collections,
	allProducts,
	deliveryContent,
	zipCodes,
	initialCollection = null,
}: Props) => {
	const [width] = useWindowSize()
	const [selectedCollection, setSelectedCollection] = useState(
		collections[0].node.handle
	)
	const [showSelectModal, setShowSelectModal] = useState(false)
	const [productSearch, setProductSearch] = useState<string>('')
	const [productsBeforeZipCodeCheck, setProductsBeforeZipCodeCheck] = useState<
		number | null
	>(null)

	useEffect(() => {
		if (width > 0) {
			const productsPerRow =
				width < 960 && width > 768
					? 3
					: width < 768 && width > 380
					? 2
					: width < 380
					? 1
					: 4
			setProductsBeforeZipCodeCheck(productsPerRow * 3)
		}
	}, [width])

	useEffect(() => {
		if (collections.some((c: any) => c.node.handle === initialCollection)) {
			setSelectedCollection(initialCollection)
		}
	}, [collections, initialCollection])

	const productsByCollection = collections.map((collection: any) => {
		collection.products = allProducts?.filter((product: any) => {
			return product.node.collections.nodes.some(
				(node: any) => node.handle === collection.node.handle
			)
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

	const productsGrid = (productsToDisplay: any[]) => {
		if (
			productsBeforeZipCodeCheck &&
			productsToDisplay.length > productsBeforeZipCodeCheck
		) {
			return (
				<>
					<div className={layout.container}>
						<div className={layout.grid_container}>
							{productsToDisplay
								.slice(0, productsBeforeZipCodeCheck)
								.map((product: any) => (
									<Product
										key={product.node.handle}
										productData={product.node}
									/>
								))}
						</div>
					</div>
					<ZipCodeCheck deliveryContent={deliveryContent} zipCodes={zipCodes} />
					<div className={layout.container}>
						<div className={layout.grid_container}>
							{productsToDisplay
								.slice(productsBeforeZipCodeCheck, productsToDisplay.length)
								.map((product: any) => (
									<Product
										key={product.node.handle}
										productData={product.node}
									/>
								))}
						</div>
					</div>
				</>
			)
		}
		return (
			<>
				<div className={layout.container}>
					<div className={layout.grid_container}>
						{productsToDisplay.map((product: any) => (
							<Product key={product.node.handle} productData={product.node} />
						))}
					</div>
				</div>
				<ZipCodeCheck deliveryContent={deliveryContent} zipCodes={zipCodes} />
			</>
		)
	}

	const productSearchHandler = useRef(
		debounce((e) => {
			setProductSearch(e?.target?.value)
		}, 300)
	)

	const renderProducts = () => {
		if (productSearch) {
			const filteredProducts = productsByCollection
				.find(
					(collection: any) => collection.node.handle === selectedCollection
				)
				.products.filter((product: any) =>
					product.node.title.toLowerCase().includes(productSearch.toLowerCase())
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
	}

	return (
		<>
			<div className={layout.container}>
				<div className={`${layout.flex_row} ${layout.gap_large}`}>
					<div className={`${layout.flex_row} ${layout.collapse_mobile}`}>
						{width <= 1024 ? (
							<>
								<Button primary clickCallback={() => setShowSelectModal(true)}>
									{
										collections.find(
											(collection: any) =>
												collection.node.handle === selectedCollection
										).node.title
									}
								</Button>
								{showSelectModal ? <SelectModal /> : null}
							</>
						) : (
							<>
								{collections.map((collection: any) => (
									<Button
										primary={selectedCollection === collection.node.handle}
										key={collection.node.handle}
										clickCallback={() =>
											toggleCollection(collection.node.handle)
										}
									>
										{collection.node.title}
									</Button>
								))}
							</>
						)}
					</div>
					<Search
						changeCallback={(e: any) => productSearchHandler.current(e)}
					/>
				</div>
			</div>
			{renderProducts()}
		</>
	)
}

export default ProductGrid
