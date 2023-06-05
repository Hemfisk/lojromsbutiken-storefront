/* eslint-disable react-hooks/rules-of-hooks */
export const getCart = (updateCartId: any, updateCartItems: any) => {
	const cart = localStorage.getItem('cart')
	if (cart) {
		const cartContent = JSON.parse(cart)
		updateCartId(cartContent.cartId)
		updateCartItems(cartContent.items)
		return cartContent
	}
	return null
}

export const updateCart = (
	updateCartId: any,
	updateCartItems: any,
	cartInput?: any
) => {
	if (cartInput) {
		localStorage.setItem('cart', JSON.stringify(cartInput))
		updateCartId(cartInput.cartId)
		updateCartItems(cartInput.items)
		return cartInput
	}
	localStorage.removeItem('cart')
	return null
}

export const addToCart = (
	variantId: string,
	cartId: string | null,
	items: number | null,
	updateCartId: any,
	updateCartItems: any
) => {
	if (items && items > 0) {
		console.log(
			'add to cart',
			variantId,
			cartId,
			items,
			updateCartId,
			updateCartItems
		)
	} else {
		console.log(
			'create cart',
			variantId,
			cartId,
			items,
			updateCartId,
			updateCartItems
		)
	}
}
