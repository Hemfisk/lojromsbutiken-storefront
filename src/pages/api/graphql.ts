import { getPrivateTokenHeaders, getStorefrontApiUrl } from './shopify'

export const gqlShopify = async (query: string, variables?: {}) =>
	await fetch(getStorefrontApiUrl(), {
		body: JSON.stringify({
			query,
			variables,
		}),
		headers: getPrivateTokenHeaders(),
		method: 'POST',
	})
		.then((response) => response.json())
		.then((response) => response.data)
