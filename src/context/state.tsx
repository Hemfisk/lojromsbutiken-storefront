/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from 'react'

type CartContextType = {
	cartId: string | null
	items: number | null
	updateCartId: (cartId: string) => void
	updateCartItems: (items: number) => void
}

interface Props {
	children: React.ReactNode
}

const cartContextDefaultValues: CartContextType = {
	cartId: null,
	items: null,
	updateCartId: () => {},
	updateCartItems: () => {},
}

const CartContext = createContext<CartContextType>(cartContextDefaultValues)

export const useCart = () => {
	return useContext(CartContext)
}

export const CartProvider = ({ children }: Props) => {
	const [cartId, setCartId] = useState<string | null>(null)
	const [items, setItems] = useState<number | null>(null)

	const updateCartId = (cartId: string) => {
		setCartId(cartId)
	}

	const updateCartItems = (items: number) => {
		setItems(items)
	}

	const value = {
		cartId,
		items,
		updateCartId,
		updateCartItems,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
