import { createStorefrontClient } from '@shopify/hydrogen-react'

const client = createStorefrontClient({
	privateStorefrontToken: process.env.PRIVATE_STOREFRONT_TOKEN,
	publicStorefrontToken: process.env.NEXT_PUBLIC_STOREFRONT_TOKEN,
	storeDomain: process.env.NEXT_PUBLIC_STOREFRONT_URL || '',
	storefrontApiVersion: '2023-04',
})

export const getStorefrontApiUrl = client.getStorefrontApiUrl
export const getPrivateTokenHeaders = client.getPrivateTokenHeaders
export const getPublicTokenHeaders = client.getPublicTokenHeaders
