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

export const getAllGqlShopify = async (
	key: string,
	query: string,
	variables?: {}
): Promise<any[]> => {
	let hasNextPage = false
	const result: any[] = []
	await gqlShopify(query, variables).then((res) => {
		result.push(...res[key].edges)
		hasNextPage = res[key].pageInfo.hasNextPage
	})

	while (hasNextPage) {
		await gqlShopify(query, {
			...variables,
			cursor: result[result.length - 1].cursor,
		}).then((res) => {
			result.push(...res[key].edges)
			hasNextPage = res[key].pageInfo.hasNextPage
		})
	}

	return result
}
