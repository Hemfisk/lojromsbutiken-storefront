import React from 'react'

import styles from '@/styles/PageContent.module.scss'
import PageHeader from './PageHeader'

interface Props {
	content: any
	contentOnly?: boolean
	maxWidth?: boolean
	noMargin?: boolean
}

const PageContent = ({
	content,
	contentOnly = false,
	maxWidth = false,
	noMargin = false,
}: Props) => {
	const { page } = content
	return (
		<>
			<section
				className={`${styles.page_section} ${
					contentOnly ? styles.content_only : ''
				} ${maxWidth ? styles.max_width : ''}`}
				style={{ backgroundImage: `url("/logo_dalafisk.svg")` }}
			>
				<div className={styles.page_container}>
					{contentOnly ? null : <PageHeader>{page.title}</PageHeader>}
					<div
						className={`${styles.page_content} ${
							noMargin ? styles.no_margin : ''
						}`}
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
