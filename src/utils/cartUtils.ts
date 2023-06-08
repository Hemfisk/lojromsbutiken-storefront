import { gqlShopify } from '@/pages/api/graphql'
import { ADD_TO_CART, CREATE_CART, GET_CHECKOUT_URL } from '@/pages/api/queries'

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

export const getCheckoutUrl = async (cartId: string) => {
	const checkoutUrl = await gqlShopify(GET_CHECKOUT_URL, { id: cartId })
	if (checkoutUrl) {
		console.log(checkoutUrl)
	}
}
