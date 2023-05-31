import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/styles/Recipe.module.scss'
import Button from './Button'

interface Props {
	recipe: any
}

const Recipe = ({ recipe }: Props) => {
	const recipeData = recipe.node

	return (
		<Link href={`recept/${recipeData.handle}`} className={styles.recipe}>
			<div className={styles.recipe_container}>
				<div className={styles.recipe_image_container}>
					<Image
						src={recipeData.image.transformedSrc}
						alt={recipeData.title}
						fill
						style={{ objectFit: 'cover' }}
						sizes='(min-width: 60em) 24vw,
					(min-width: 28em) 45vw,
					100vw'
					/>
				</div>
				<div className={styles.recipe_info_container}>
					<h3>{recipeData.title}</h3>
					<p>{recipeData.excerpt}</p>
				</div>
			</div>
			<Button>Läs recept</Button>
		</Link>
	)
}

export default Recipe
