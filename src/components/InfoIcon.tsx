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
				<Tooltip placement='bottom' title={`Fångstzon${titleText}`}>
					<i>
						<PublicOutlined />
					</i>
				</Tooltip>
			)
		case 'hallbarhet':
			return (
				<Tooltip placement='bottom' title={`Hållbarhet${titleText}`}>
					<i>
						<AccessTimeOutlined />
					</i>
				</Tooltip>
			)
		case 'latin':
			return (
				<Tooltip placement='bottom' title={`Latinskt namn${titleText}`}>
					<i>
						<LocalOfferOutlined />
					</i>
				</Tooltip>
			)
		case 'storlek':
			return (
				<Tooltip placement='bottom' title={`Storlek${titleText}`}>
					<i>
						<StraightenOutlined />
					</i>
				</Tooltip>
			)
		case 'tillagning':
			return (
				<Tooltip placement='bottom' title={`Tillagning${titleText}`}>
					<i>
						<LocalDiningOutlined />
					</i>
				</Tooltip>
			)
		case 'tillstand':
			return (
				<Tooltip placement='bottom' title={`Fysiskt tillstånd${titleText}`}>
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
