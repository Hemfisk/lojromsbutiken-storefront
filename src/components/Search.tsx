import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import styles from '@/styles/Search.module.scss'

interface Props {
	changeCallback?: Function
}

const Search = ({ changeCallback }: Props) => {
	return (
		<div className={styles.search_container}>
			<input
				className={styles.search}
				type='search'
				placeholder='Vad letar du efter?'
				onChange={(e) => {
					e.stopPropagation()
					changeCallback ? changeCallback(e) : null
				}}
			/>
			<SearchOutlinedIcon className={styles.search_icon} />
		</div>
	)
}

export default Search
