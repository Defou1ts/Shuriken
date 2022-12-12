import { useSelector } from 'react-redux/es/exports';

import spinner from '../../../assets/spinner.svg';

const Spinner = ({ small = false }) => {
	const isMobile = useSelector((state) => state.global.isMobile);

	return (
		<div
			style={
				small
					? {
							display: 'flex',
							justifyContent: 'center',
					  }
					: null
			}
			className={!small ? 'spinner-wrapper' : ''}
		>
			<img
				style={
					small
						? {
								width: '90px',
								height: '90px',
								margin: isMobile ? '0px 0px 0px 0px' : '15px auto 15px auto',
						  }
						: null
				}
				src={spinner}
				alt="Loading..."
				className="spinner"
			/>
		</div>
	);
};

export default Spinner;
