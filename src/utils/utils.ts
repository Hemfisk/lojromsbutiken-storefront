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
