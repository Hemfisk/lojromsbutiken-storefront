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
	const titleText = title.length > 0 ? `: ${title}` : ''
	switch (type) {
		case 'fangst':
			return (
				<Tooltip
					disableFocusListener
					placement='bottom'
					title={`Fångstzon${titleText}`}
					arrow
				>
					<i>
						<PublicOutlined />
					</i>
				</Tooltip>
			)
		case 'hallbarhet':
			return (
				<Tooltip
					disableFocusListener
					placement='bottom'
					title={`Hållbarhet${titleText}`}
					arrow
				>
					<i>
						<AccessTimeOutlined />
					</i>
				</Tooltip>
			)
		case 'latin':
			return (
				<Tooltip
					disableFocusListener
					placement='bottom'
					title={`Latinskt namn${titleText}`}
					arrow
				>
					<i>
						<LocalOfferOutlined />
					</i>
				</Tooltip>
			)
		case 'storlek':
			return (
				<Tooltip
					disableFocusListener
					placement='bottom'
					title={`Storlek${titleText}`}
					arrow
				>
					<i>
						<StraightenOutlined />
					</i>
				</Tooltip>
			)
		case 'tillagning':
			return (
				<Tooltip
					disableFocusListener
					placement='bottom'
					title={`Tillagning${titleText}`}
					arrow
				>
					<i>
						<LocalDiningOutlined />
					</i>
				</Tooltip>
			)
		case 'tillstand':
			return (
				<Tooltip
					disableFocusListener
					placement='bottom'
					title={`Fysiskt tillstånd${titleText}`}
					arrow
				>
					<i>
						<AcUnitOutlined />
					</i>
				</Tooltip>
			)
		default:
			return <CloseOutlinedIcon />
	}
}

export default InfoIcon
