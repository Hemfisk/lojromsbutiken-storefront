export const generateImageSrcFromString = (
	htmlContent: string
): { src: string | null; alt: string | null } => {
	if (/src\s*=\s*"(.+?)"/.test(htmlContent)) {
		const src = htmlContent.match(/src\s*=\s*"(.+?)"/) as RegExpMatchArray

		if (/alt\s*=\s*"(.+?)"/.test(htmlContent)) {
			const alt = htmlContent.match(/alt\s*=\s*"(.+?)"/) as RegExpMatchArray

			return { src: src[1], alt: alt[1] }
		}
		return { src: src[1], alt: null }
	}
	return { src: null, alt: null }
}

export const parseWeight = (weightData: any): string => {
	switch (weightData.weightUnit) {
		case 'KILOGRAMS':
			return `${weightData.weight} KG`

		case 'GRAMS':
			return `${weightData.weight} g`

		default:
			return `${weightData.weight} KG`
	}
}

export const parseAmount = (price: number): number => {
	return Math.ceil(price)
}

export const parsePrice = (
	amount: number,
	collection: string,
	weightData: any
): string => {
	switch (collection) {
		case 'paket':
			return `${parseAmount(amount)} KR/ST`

		default:
			switch (weightData.weightUnit) {
				case 'KILOGRAMS':
					return `${parseAmount(amount / weightData.weight)} KR/KG`

				default:
					return `${parseAmount(amount)} KR/ST`

				/* case 'GRAMS':
					return `${parseAmount(amount)} KR/${weightData.weight} g`

				default:
					return `${parseAmount(amount / weightData.weight)} KR/KG` */
			}
	}
}

type HtmlNode = {
	type: string
	children: HtmlNode[]
	listType?: string
	value?: string
}

export const parseHtml = (data: HtmlNode): string => {
	return data.children
		?.map((node: HtmlNode) => {
			switch (node.type) {
				case 'text': {
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
