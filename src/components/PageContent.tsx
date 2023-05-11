import React from 'react'

import styles from '@/styles/PageContent.module.scss'
import PageHeader from './PageHeader'

interface Props {
	content: any
}

const PageContent = ({ content }: Props) => {
	const { page } = content
	return (
		<>
			<section
				className={styles.page_section}
				style={{ backgroundImage: `url("/logo_dalafisk.svg")` }}
			>
				<div className={styles.page_container}>
					<PageHeader>{page.title}</PageHeader>
					<div
						className={styles.page_content}
						dangerouslySetInnerHTML={{ __html: page.body }}
					/>
				</div>
			</section>
		</>
	)
}

export default PageContent
