import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined'

import styles from '@/styles/ImageViewer.module.scss'
import { addonBanner, addonRound } from './Addons'

interface Props {
	images?: any
	media?: any
	imageSrc?: string
	productTitle: string
	addon?: { type: string; text: string } | null
	certs?: React.ReactNode
}

const ImageViewer = ({
	images,
	media,
	imageSrc = '',
	productTitle,
	addon = null,
	certs = null,
}: Props) => {
	const [image, setImage] = useState(
		imageSrc || images?.edges[0]?.node?.transformedSrc
	)
	const [video, setVideo] = useState<any>(null)

	useEffect(() => {
		setImage(images?.edges[0]?.node?.transformedSrc)
	}, [images])

	const videos = media?.edges
		.filter((edge: any) => edge.node.mediaContentType !== 'IMAGE')
		.map((edge: any) => edge.node)

	const imageSelector = () => {
		if (images?.edges?.length > 1 || videos.length > 0) {
			return (
				<div className={styles.image_selector}>
					{images.edges.map((edge: any, index: number) => {
						const selected = image === edge.node.transformedSrc
						return (
							<div
								key={`image_${index}`}
								className={`${styles.image_container} ${
									selected ? styles.selected : ''
								}`}
								onClick={() => setImage(edge.node.transformedSrc)}
							>
								<Image
									src={edge.node.transformedSrc}
									alt={productTitle}
									fill
									style={{ objectFit: 'cover' }}
									sizes='(min-width: 60em) 12vw, (min-width: 28em) 45vw, 50vw'
								/>
							</div>
						)
					})}
					{videos.map((video: any, index: number) => {
						return (
							<div
								key={`video_${index}`}
								className={`${styles.image_container} ${styles.video_preview}`}
								onClick={() => setVideo(video)}
							>
								<div className={styles.icon}>
									<PlayCircleOutlineOutlinedIcon />
								</div>
								<Image
									src={video.previewImage.transformedSrc}
									alt={video.alt ? video.alt : productTitle}
									fill
									style={{ objectFit: 'cover' }}
									sizes='(min-width: 60em) 12vw, (min-width: 28em) 45vw, 50vw'
								/>
							</div>
						)
					})}
				</div>
			)
		}
		return null
	}

	const videoModal = () => {
		if (video) {
			const videoEmbed = () => {
				if (video.embedUrl) {
					return (
						<iframe
							src={`${video.embedUrl}?autoplay=1&modestbranding=1`}
							frameBorder={0}
							allowFullScreen
						/>
					)
				}
				if (video.sources) {
					return (
						<>
							{video.alt ? <h1>{video.alt}</h1> : null}
							<video controls autoPlay>
								{video.sources.map((source: any, index: number) => (
									<source
										key={`source_${index}`}
										src={source.url}
										type={`video/${source.format}`}
									/>
								))}
							</video>
						</>
					)
				}
				return null
			}
			return (
				<div
					className={styles.video_modal_container}
					onClick={() => setVideo(null)}
				>
					<div className={styles.close} onClick={() => setVideo(null)}>
						<CloseOutlinedIcon />
					</div>
					{videoEmbed()}
				</div>
			)
		}
		return null
	}

	return (
		<>
			<div className={styles.image_viewer}>
				{addonRound(addon, { left: '-2em', right: 'auto' })}
				<div className={styles.image_container}>
					<Image
						src={image}
						alt={productTitle}
						fill
						style={{ objectFit: 'cover' }}
						sizes='(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw'
					/>
					{addonBanner(addon, { right: '-34%', bottom: '16%' })}
					{certs ? certs : null}
				</div>
				{imageSelector()}
			</div>
			{videoModal()}
		</>
	)
}

export default ImageViewer
