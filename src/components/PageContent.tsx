import React from 'react'

interface Props {
	content: any
}

const PageContent = ({ content }: Props) => {
	console.log(content)
	return <div>PageContent</div>
}

export default PageContent
