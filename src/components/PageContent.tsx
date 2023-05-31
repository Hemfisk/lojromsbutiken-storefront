import React from 'react'

import styles from '@/styles/PageContent.module.scss'
import PageHeader from './PageHeader'

interface Props {
	content: any
	contentOnly?: boolean
}

const PageContent = ({ content, contentOnly = false }: Props) => {
	const { page } = content
	return (
		<>
			<section
				className={`${styles.page_section} ${
					contentOnly ? styles.content_only : ''
				}`}
				style={{ backgroundImage: `url("/logo_dalafisk.svg")` }}
			>
				<div className={styles.page_container}>
					{contentOnly ? null : <PageHeader>{page.title}</PageHeader>}
					<div
						className={styles.page_content}
						dangerouslySetInnerHTML={{
							__html: contentOnly ? content : page.body,
						}}
					/>
				</div>
			</section>
		</>
	)
}

export default PageContent
