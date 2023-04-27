import { getPublicTokenHeaders, getStorefrontApiUrl } from './shopify'

export const gqlShopify = async (query: string, variables?: {}) =>
	await fetch(getStorefrontApiUrl(), {
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: getPublicTokenHeaders(),
		method: 'POST',
	})
		.then((response) => response.json())
		.then((response) => response.data)
