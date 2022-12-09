import { useDispatch, useSelector } from 'react-redux';
import { setShowProfileSettings } from '../../../slices/profileSlice';
import { createPortal } from 'react-dom';
import { useLog } from '../../../services/logService/log.service';

import './profileHeader.scss';

import ProfileSettings from '../profileForms/profileSettings/ProfileSettings';
import Spinner from '../../common/spinner/Spinner';

import settingsIcon from '../../../assets/settings.svg';
import userIcon from '../../../assets/blankpic.svg';

const ProfileHeader = () => {
	const dispatch = useDispatch();
	const showProfileSettings = useSelector((state) => state.profile.showProfileSettings);
	const { username, email, isVerifiedEmail, createdAt } = useSelector((state) => state.global.user);

	const { logRegisterTime } = useLog();

	if (!username) return <Spinner />;

	const { days } = logRegisterTime(new Date(createdAt));
	return (
		<>
			{showProfileSettings ? createPortal(<ProfileSettings />, document.getElementById('root')) : null}

			<div className="profile__header">
				<div className="profile__row">
					<div className="profile__icon">
						<img src={userIcon} alt="profile" />
					</div>
					<div className="profile__info">
						<h2 className="profile__username">{username}</h2>
						<p className="profile__exist-time">На сайте {days} дней</p>
						<p className="profile__email">{email}</p>
						{isVerifiedEmail ? null : (
							<div className="profile__email-verify">
								<span className="profile__email-verify-btn">Подтвердите</span> свою почту для
								безопастности аккаунта
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
