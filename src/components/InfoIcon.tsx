import { useState } from 'react'

import PublicOutlined from '@mui/icons-material/PublicOutlined'
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined'
import LocalOfferOutlined from '@mui/icons-material/LocalOfferOutlined'
import StraightenOutlined from '@mui/icons-material/StraightenOutlined'
import LocalDiningOutlined from '@mui/icons-material/LocalDiningOutlined'
import AcUnitOutlined from '@mui/icons-material/AcUnitOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Tooltip } from '@mui/material'

interface Props {
	type: string
	title?: string
}

const InfoIcon = ({ type, title = '' }: Props) => {
	const [open, setOpen] = useState(false)

	const handleTooltipClose = () => {
		setOpen(false)
	}

	const handleTooltipOpen = () => {
		setOpen(true)
	}

	const titleText = title.length > 0 ? `: ${title}` : ''
	switch (type) {
		case 'fangst':
			return (
				<Tooltip
					disableFocusListener
					placement='top'
					title={`Fångstzon${titleText}`}
					onClose={handleTooltipClose}
					open={open}
					arrow
				>
					<i onClick={handleTooltipOpen}>
						<PublicOutlined />
					</i>
				</Tooltip>
			)
		case 'hallbarhet':
			return (
				<Tooltip
					disableFocusListener
					placement='top'
					title={`Hållbarhet${titleText}`}
					onClose={handleTooltipClose}
					open={open}
					arrow
				>
					<i onClick={handleTooltipOpen}>
						<AccessTimeOutlined />
					</i>
				</Tooltip>
			)
		case 'latin':
			return (
				<Tooltip
					disableFocusListener
					placement='top'
					title={`Latinskt namn${titleText}`}
					onClose={handleTooltipClose}
					open={open}
					arrow
				>
					<i onClick={handleTooltipOpen}>
						<LocalOfferOutlined />
					</i>
				</Tooltip>
			)
		case 'storlek':
			return (
				<Tooltip
					disableFocusListener
					placement='top'
					title={`Storlek${titleText}`}
					onClose={handleTooltipClose}
					open={open}
					arrow
				>
					<i onClick={handleTooltipOpen}>
						<StraightenOutlined />
					</i>
				</Tooltip>
			)
		case 'tillagning':
			return (
				<Tooltip
					disableFocusListener
					placement='top'
					title={`Tillagning${titleText}`}
					onClose={handleTooltipClose}
					open={open}
					arrow
				>
					<i onClick={handleTooltipOpen}>
						<LocalDiningOutlined />
					</i>
				</Tooltip>
			)
		case 'tillstand':
			return (
				<Tooltip
					disableFocusListener
					placement='top'
					title={`Fysiskt tillstånd${titleText}`}
					onClose={handleTooltipClose}
					open={open}
					arrow
				>
					<i onClick={handleTooltipOpen}>
						<AcUnitOutlined />
					</i>
				</Tooltip>
			)
		default:
			return <CloseOutlinedIcon />
	}
}

export default InfoIcon
