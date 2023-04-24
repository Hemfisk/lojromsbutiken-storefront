import { createStorefrontClient } from '@shopify/hydrogen-react'

const client = createStorefrontClient({
	privateStorefrontToken: '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',
	storeDomain: 'https://dalafisk.myshopify.com',
	storefrontApiVersion: '2023-04',
})

export const getStorefrontApiUrl = client.getStorefrontApiUrl
export const getPrivateTokenHeaders = client.getPrivateTokenHeaders
