import PublicOutlined from '@mui/icons-material/PublicOutlined'
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined'
import LocalOfferOutlined from '@mui/icons-material/LocalOfferOutlined'
import StraightenOutlined from '@mui/icons-material/StraightenOutlined'
import LocalDiningOutlined from '@mui/icons-material/LocalDiningOutlined'
import AcUnitOutlined from '@mui/icons-material/AcUnitOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

interface Props {
	type: string
}

const InfoIcon = ({ type }: Props) => {
	switch (type) {
		case 'fangst':
			return (
				<i title='Fångstzon'>
					<PublicOutlined />
				</i>
			)
		case 'hallbarhet':
			return (
				<i title='Hållbarhet'>
					<AccessTimeOutlined />
				</i>
			)
		case 'latin':
			return (
				<i title='Latinskt namn'>
					<LocalOfferOutlined />
				</i>
			)
		case 'storlek':
			return (
				<i title='Storlek'>
					<StraightenOutlined />
				</i>
			)
		case 'tillagning':
			return (
				<i title='Tillagning'>
					<LocalDiningOutlined />
				</i>
			)
		case 'tillstand':
			return (
				<i title='Fysiskt tillstånd'>
					<AcUnitOutlined />
				</i>
			)
		default:
			return <CloseOutlinedIcon />
	}
}

export default InfoIcon
