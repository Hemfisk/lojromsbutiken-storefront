export const parseWeight = (variantData: any): string => {
	switch (variantData.weightUnit) {
		case 'KILOGRAMS':
			return `${variantData.weight} KG`

		case 'GRAMS':
			return `${variantData.weight} g`

		default:
			return `${variantData.weight} KG`
	}
}

export const parseAmount = (price: number): number => {
	return Math.ceil(price)
}

export const parsePrice = (
	amount: number,
	collection: string,
	variantData?: any
): string => {
	switch (collection) {
		case 'paket':
			if (variantData.amount) {
				return `${parseAmount(
					amount / parseInt(variantData.amount.value)
				)} KR/ST`
			}
			return `${parseAmount(amount)} KR/ST`

		case 'fullPrice':
			return `${parseAmount(amount)} KR`

		default:
			switch (variantData.weightUnit) {
				case 'KILOGRAMS':
					return `${parseAmount(amount / variantData.weight)} KR/KG`

				case 'GRAMS':
					return `${parseAmount(amount / (variantData.weight / 100))} KR/HG`

				default:
					return `${parseAmount(amount)} KR/ST`
			}
	}
}

type HtmlNode = {
	type: string
	children: HtmlNode[]
	listType?: string
	value?: string
	bold?: boolean
	italic?: boolean
}

export const parseHtml = (data: HtmlNode): string => {
	return data.children
		?.map((node: HtmlNode) => {
			switch (node.type) {
				case 'text': {
					if (node.bold && !node.italic) {
						return `<b>${node.value}</b>`
					}
					if (node.italic && !node.bold) {
						return `<i>${node.value}</i>`
					}
					if (node.bold && node.italic) {
						return `<b><i>${node.value}</i></b>`
					}
					return node.value
				}
				case 'paragraph': {
					return `<p>${parseHtml(node)}</p>`
				}
				case 'list': {
					if (node.listType === 'unordered') {
						return `<ul>${parseHtml(node)}</ul>`
					} else {
						return `<ol>${parseHtml(node)}</ol>`
					}
				}
				case 'list-item': {
					return `<li>${parseHtml(node)}</li>`
				}
				default: {
					return parseHtml(node)
				}
			}
		})
		.join('\n')
}

export const getPageDescription = (content: string) => {
	const n = 150
	const string = content.replace(/<\/?[^>]+(>|$)/g, '')

	return string.length > n ? string.slice(0, n - 3) + '...' : string
}
