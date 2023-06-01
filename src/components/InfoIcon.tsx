import PublicOutlined from '@mui/icons-material/PublicOutlined'
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined'
import LocalOfferOutlined from '@mui/icons-material/LocalOfferOutlined'
import StraightenOutlined from '@mui/icons-material/StraightenOutlined'
import LocalDiningOutlined from '@mui/icons-material/LocalDiningOutlined'
import AcUnitOutlined from '@mui/icons-material/AcUnitOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

interface Props {
	type: string
	title?: string
}

const InfoIcon = ({ type, title = '' }: Props) => {
	const titleText = title.length > 0 ? `: ${title}` : ''
	switch (type) {
		case 'fangst':
			return (
				<i title={`Fångstzon${titleText}`}>
					<PublicOutlined />
				</i>
			)
		case 'hallbarhet':
			return (
				<i title={`Hållbarhet${titleText}`}>
					<AccessTimeOutlined />
				</i>
			)
		case 'latin':
			return (
				<i title={`Latinskt namn${titleText}`}>
					<LocalOfferOutlined />
				</i>
			)
		case 'storlek':
			return (
				<i title={`Storlek${titleText}`}>
					<StraightenOutlined />
				</i>
			)
		case 'tillagning':
			return (
				<i title={`Tillagning${titleText}`}>
					<LocalDiningOutlined />
				</i>
			)
		case 'tillstand':
			return (
				<i title={`Fysiskt tillstånd${titleText}`}>
					<AcUnitOutlined />
				</i>
			)
		default:
			return <CloseOutlinedIcon />
	}
}

export default InfoIcon
