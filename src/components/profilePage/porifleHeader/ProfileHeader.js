import { useSelector } from 'react-redux';
import { useLog } from '../../../services/logService/log.service';

import './profileHeader.scss';

import Spinner from '../../common/spinner/Spinner';

import settingsIcon from '../../../assets/settings.svg';
import userIcon from '../../../assets/blankpic.svg';

const ProfileHeader = () => {
    const { username, email, isVerifiedEmail, createdAt } = useSelector(
        (state) => state.global.user
    );

    const { logRegisterTime } = useLog();

    if (!username) return <Spinner />;

    const { days } = logRegisterTime(createdAt);
    return (
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
                            <span className="profile__email-verify-btn">
                                Подтвердите
                            </span>{' '}
                            свою почту для безопастности аккаунта
                        </div>
                    )}
                </div>
                <div className="profile__settings">
                    <img src={settingsIcon} alt="settings" />
                </div>
            </div>
        </div>
    );
};
export default ProfileHeader;
