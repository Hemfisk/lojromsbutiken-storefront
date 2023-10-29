import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from '@/styles/Hero.module.scss'
import { Plate } from './plates/plateUtils'
import { RomPlate, KaviarPlate } from './plates'

const plates: Plate[] = [
	/* {
		title: 'Fisk',
		handle: '/vart-sortiment/fisk',
		class: styles.fish,
		component: <FiskPlate title='Fisk' key='fisk_image' />,
	},
	{
		title: 'Skaldjur',
		handle: '/vart-sortiment/skaldjur',
		class: styles.fish,
		component: <SkaldjurPlate title='Skaldjur' key='skaldjur_image' />,
	},
	{
		title: 'Paket',
		handle: '/vart-sortiment/paket',
		class: styles.fish,
		component: <PaketPlate title='Paket' key='paket_image' />,
	}, */
	{
		title: 'Rom',
		handle: '/produkter/lojrom-kalix',
		class: styles.fish,
		component: <RomPlate title='Rom' key='rom_image' />,
	},
	{
		title: 'Kaviar',
		handle: '/produkter/caviar-oscietra-6-star-30-g',
		class: styles.fish,
		component: <KaviarPlate title='Kaviar' key='kaviar_image' />,
	},
]

let windowWidth = 0
let xPosition = 0

const Hero = ({ heroContent }: any) => {
	const [tableIsScrollable, setTableIsScrollable] = useState(false)
	const [maxScrollLength, setMaxScrollLength] = useState(0)
	const [translateXStartPos, setTranslateXStartPos] = useState(0)
	const [translateX, setTranslateX] = useState(0)

	const tableRef = useRef<HTMLDivElement>(null)

	const getPlatePositions = (): DOMRect[] => {
		const platePositions: DOMRect[] = []

		tableRef.current?.childNodes.forEach((node) => {
			const nodeElement = node as Element
			const nodeElementRect = nodeElement.getBoundingClientRect()
			platePositions.push(nodeElementRect)
		})

		return platePositions
	}

	useEffect(() => {
		const handlePlateScrollFromScreenSize = (init: boolean = false) => {
			const platePositions = getPlatePositions()

			const isTableScrollable = platePositions.some(
				(node) => node.left < 0 || node.right > window.innerWidth
			)
			const padding = platePositions[0].width / 5
			setTableIsScrollable(isTableScrollable)
			if (windowWidth !== window.innerWidth || init) {
				windowWidth = window.innerWidth
				setMaxScrollLength(Math.abs(platePositions[0].left) + padding)
				if (!isTableScrollable) {
					setTranslateX(0)
				}
			}
		}

		const handleScreenResize = () => {
			handlePlateScrollFromScreenSize()
		}

		handlePlateScrollFromScreenSize(true)

		window.addEventListener('resize', handleScreenResize)

		return () => window.removeEventListener('resize', handleScreenResize)
	}, [])

	const handleTableDrag = useMemo(
		() => (e: React.DragEvent) => {
			e.stopPropagation()

			const dragMove = (e: Event) => {
				const event = e as DragEvent
				const translate = Math.round(
					translateXStartPos + event.clientX - xPosition
				)

				if (Math.abs(translate) <= maxScrollLength) {
					setTranslateX(translate)
				} else {
					if (translate < 0) {
						setTranslateX(-maxScrollLength)
					} else {
						setTranslateX(maxScrollLength)
					}
				}
			}

			xPosition = e.clientX

			if (e.type === 'dragstart') {
				e.target.addEventListener('dragover', dragMove, { passive: true })
			} else {
				e.target.removeEventListener('dragover', dragMove)
				setTranslateXStartPos(translateX)
			}
		},
		[maxScrollLength, translateX, translateXStartPos]
	)

	const handleTableTouch = useMemo(
		() => (e: React.TouchEvent) => {
			e.stopPropagation()

			const touchMove = (e: Event) => {
				const event = e as TouchEvent
				const translate = Math.round(
					translateXStartPos + event.touches[0]?.clientX - xPosition
				)

				if (Math.abs(translate) <= maxScrollLength) {
					setTranslateX(translate)
				} else {
					if (translate < 0) {
						setTranslateX(-maxScrollLength)
					} else {
						setTranslateX(maxScrollLength)
					}
				}
			}

			xPosition = e.touches[0]?.clientX

			if (e.type === 'touchstart') {
				e.target.addEventListener('touchmove', touchMove, { passive: true })
			} else {
				e.target.removeEventListener('touchmove', touchMove)
				setTranslateXStartPos(translateX)
			}
		},
		[maxScrollLength, translateX, translateXStartPos]
	)

	return (
		<>
			<section className={styles.hero_section} id='hero-section'>
				<div className={styles.hero_content}>
					<div className={`${styles.hero_image} ${styles.knives}`}>
						<Image
							src='/hero/knives.png'
							alt='Knivar'
							fill
							sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
							loading='eager'
							priority
						/>
					</div>
					<div className={`${styles.hero_image} ${styles.decor}`}>
						<Image
							src='/hero/decor.png'
							alt='Knivar'
							fill
							sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
							loading='eager'
							priority
						/>
					</div>
					<div className={`${styles.hero_image} ${styles.logo}`}>
						<Image
							src='/LOGO_lojromsbutiken_skylt.png'
							alt='Löjromsbutiken logotyp'
							fill
							sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
							loading='eager'
							priority
						/>
					</div>
					<div className={`${styles.hero_image} ${styles.kaviar}`}>
						<Image
							src='/hero/kaviar.png?id=2'
							alt='Kaviar'
							fill
							sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
							loading='eager'
							priority
						/>
					</div>
					<div className={`${styles.hero_image} ${styles.rom}`}>
						<Image
							src='/hero/rom_glas.png'
							alt='Rom glas'
							fill
							sizes='(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw'
							loading='eager'
							priority
						/>
					</div>
				</div>
				<div
					ref={tableRef}
					className={styles.hero_background_table}
					style={
						{
							'--translate-x': `${tableIsScrollable ? translateX : 0}px`,
						} as React.CSSProperties
					}
				>
					{plates.map((plate) => (
						<Link
							key={`${plate.title}_link`}
							href={plate.handle}
							title={plate.title}
							className={`${styles.hero_plate} ${plate.class}`}
							onDragStart={(e) =>
								tableIsScrollable ? handleTableDrag(e) : null
							}
							onDragEnd={(e) => (tableIsScrollable ? handleTableDrag(e) : null)}
							onDragLeave={(e) =>
								tableIsScrollable ? handleTableDrag(e) : null
							}
							onDragExit={(e) =>
								tableIsScrollable ? handleTableDrag(e) : null
							}
							onTouchStart={(e) =>
								tableIsScrollable ? handleTableTouch(e) : null
							}
							onTouchEnd={(e) =>
								tableIsScrollable ? handleTableTouch(e) : null
							}
							onTouchCancel={(e) =>
								tableIsScrollable ? handleTableTouch(e) : null
							}
						>
							{plate.component}
						</Link>
					))}
				</div>
			</section>
			<section className={styles.hero_text}>
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: heroContent.body }}
				/>
			</section>
		</>
	)
}

export default Hero
