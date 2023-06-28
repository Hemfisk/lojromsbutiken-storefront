export const readFileFromUrl = async (url: string) =>
	await fetch(url)
		.then((response) => response.text())
		.then((data) => {
			return data
		})
		.catch((error) => console.log(error))
