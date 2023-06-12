import { gqlShopify } from '@/pages/api/graphql'
import {
	ADD_TO_CART,
	CREATE_CART,
	GET_CHECKOUT_URL,
	REMOVE_CART_ITEM,
	UPDATE_CART_ITEM,
} from '@/pages/api/queries'

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
	updateCartId(null)
	updateCartItems(null)
	return null
}

export const addToCart = async (
	variantId: string,
	cartId: string | null,
	items: number | null,
	updateCartId: any,
	updateCartItems: any
) => {
	if (items && items > 0) {
		const updatedCart = await gqlShopify(ADD_TO_CART, {
			cartId: cartId,
			id: variantId,
		})
		if (updatedCart) {
			updateCart(updateCartId, updateCartItems, {
				cartId: updatedCart.cartLinesAdd?.cart?.id,
				items: updatedCart.cartLinesAdd?.cart?.totalQuantity,
			})
		}
	} else {
		const createCart = await gqlShopify(CREATE_CART, { id: variantId })
		if (createCart) {
			updateCart(updateCartId, updateCartItems, {
				cartId: createCart.cartCreate?.cart?.id,
				items: createCart.cartCreate?.cart?.totalQuantity,
			})
		}
	}
}

export const updateCartItem = async (
	lineId: string,
	quantity: number,
	cartId: string | null,
	items: number | null,
	updateCartId: any,
	updateCartItems: any
) => {
	if (quantity > 0) {
		const updatedCart = await gqlShopify(UPDATE_CART_ITEM, {
			cartId: cartId,
			id: lineId,
			quantity: quantity,
		})
		if (updatedCart) {
			updateCart(updateCartId, updateCartItems, {
				cartId: updatedCart.cartLinesUpdate?.cart?.id,
				items: updatedCart.cartLinesUpdate?.cart?.totalQuantity,
			})
		}
	} else {
		if (items && items > 1) {
			const updatedCart = await gqlShopify(REMOVE_CART_ITEM, {
				cartId: cartId,
				id: lineId,
			})
			if (updatedCart) {
				updateCart(updateCartId, updateCartItems, {
					cartId: updatedCart.cartLinesRemove?.cart?.id,
					items: updatedCart.cartLinesRemove?.cart?.totalQuantity,
				})
			}
		} else {
			console.log('test', items)
			const updatedCart = await gqlShopify(REMOVE_CART_ITEM, {
				cartId: cartId,
				id: lineId,
			})
			if (updatedCart) {
				updateCart(updateCartId, updateCartItems)
			}
		}
	}
}

export const getCheckoutUrl = async (cartId: string | null) => {
	if (cartId) {
		const checkoutUrl = await gqlShopify(GET_CHECKOUT_URL, { id: cartId })
		if (checkoutUrl) {
			return checkoutUrl.cart.checkoutUrl
		}
	}
	return null
}
