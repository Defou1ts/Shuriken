import { LOADING, SUCCESS } from '../../../../utils/consts';
import './profileMessage.scss';

import Spinner from '../../../common/spinner/Spinner';

import successIcon from '../../../../assets/success.svg';
import { useSelector } from 'react-redux';

const ProfileMessage = ({ children }) => {
	return (
		<>
			<div className="profile__message">
				<ContentLayout>{children}</ContentLayout>
			</div>
		</>
	);
};
export default ProfileMessage;

const ContentLayout = ({ children, loadingStatus }) => {
	const fileLoadingStatus = useSelector((state) => state.global.fileLoadingStatus);
	const verifyLoadingStatus = useSelector((state) => state.global.fileLoadingStatus);

	if (fileLoadingStatus === LOADING) {
		return <Spinner small />;
	}

	if (verifyLoadingStatus === LOADING) {
		return <Spinner small />;
	}

	return (
		<>
			<h3 className="profile__message-text">{children}</h3>
			<img src={successIcon} alt="" className="profile__message-image" />
		</>
	);
};
