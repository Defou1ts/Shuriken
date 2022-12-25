import { useDispatch, useSelector } from 'react-redux';
import { setShowProfileSettings, setShowVerifyEmail } from '../../../slices/profileSlice';
import { createPortal } from 'react-dom';
import { useLog } from '../../../services/logService/log.service';
import { API_IMAGES, LOADING } from '../../../utils/consts';

import './profileHeader.scss';

import ProfileMessage from '../profileForms/profileMessage/ProfileMessage';
import ProfileSettings from '../profileForms/profileSettings/ProfileSettings';
import ProfileVerifyEmail from '../profileForms/profileVerifyEmail/ProfileVerifyEmail';
import Spinner from '../../common/spinner/Spinner';

import settingsIcon from '../../../assets/settings.svg';

const ProfileHeader = () => {
	const dispatch = useDispatch();
	const { logRegisterTime } = useLog();

	const showProfileSettings = useSelector((state) => state.profile.showProfileSettings);
	const showProfileMessange = useSelector((state) => state.profile.showProfileMessange);
	const showVerifyEmail = useSelector((state) => state.profile.showVerifyEmail);
	const profileMessage = useSelector((state) => state.profile.profileMessage);
	const fileLoadingStatus = useSelector((state) => state.global.fileLoadingStatus);
	const { username, email, isVerifiedEmail, createdAt, image } = useSelector((state) => state.global.user);

	if (!username) return <Spinner />;

	const { days } = logRegisterTime(new Date(createdAt));

	const imageContent =
		fileLoadingStatus === LOADING ? (
			<Spinner small />
		) : (
			<img src={`${API_IMAGES}/${image}?` + Date.now()} alt="profile" />
		);

	return (
		<>
			{showProfileSettings ? createPortal(<ProfileSettings />, document.getElementById('root')) : null}
			{showProfileMessange
				? createPortal(<ProfileMessage>{profileMessage}</ProfileMessage>, document.getElementById('root'))
				: null}
			{showVerifyEmail
				? createPortal(<ProfileVerifyEmail email={email} />, document.getElementById('root'))
				: null}

			<div className="profile__header">
				<div className="profile__row">
					<div className="profile__icon">{imageContent}</div>
					<div className="profile__info">
						<h2 className="profile__username">{username}</h2>
						<p className="profile__exist-time">На сайте {days} дней</p>
						<p className="profile__email">{email}</p>
						{isVerifiedEmail ? null : (
							<div className="profile__email-verify">
								<span
									onClick={() => dispatch(setShowVerifyEmail(true))}
									className="profile__email-verify-btn"
								>
									Подтвердите
								</span>{' '}
								свою почту для безопастности аккаунта
							</div>
						)}
					</div>
					<div className="profile__settings">
						<img onClick={() => dispatch(setShowProfileSettings(true))} src={settingsIcon} alt="settings" />
					</div>
				</div>
			</div>
		</>
	);
};
export default ProfileHeader;
