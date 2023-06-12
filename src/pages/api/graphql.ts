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

const getResult = (response: any, key: string | string[]) => {
	let gqlResult = response
	if (typeof key === 'string') {
		gqlResult = response[key]
	} else {
		key.forEach((k) => {
			gqlResult = gqlResult[k]
		})
	}
	return gqlResult
}

export const getAllGqlShopify = async (
	key: string | string[],
	query: string,
	variables?: {}
): Promise<any[]> => {
	let hasNextPage = false
	const result: any[] = []
	await gqlShopify(query, variables).then((res) => {
		const gqlResult = getResult(res, key)

		result.push(...gqlResult.edges)
		hasNextPage = gqlResult.pageInfo.hasNextPage
	})

	while (hasNextPage) {
		await gqlShopify(query, {
			...variables,
			cursor: result[result.length - 1].cursor,
		}).then((res) => {
			const gqlResult = getResult(res, key)

			result.push(...gqlResult.edges)
			hasNextPage = gqlResult.pageInfo.hasNextPage
		})
	}

	return result
}
