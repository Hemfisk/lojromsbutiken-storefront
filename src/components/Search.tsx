import React from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import styles from '@/styles/Search.module.scss'

const Search = () => {
	return (
		<div className={styles.search_container}>
			<input
				className={styles.search}
				type='search'
				placeholder='Vad letar du efter?'
			/>
			<SearchOutlinedIcon className={styles.search_button} />
		</div>
	)
}

export default Search
