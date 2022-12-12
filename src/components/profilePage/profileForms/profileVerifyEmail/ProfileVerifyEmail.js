import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUserService } from '../../../../services/auth/user.service';
import { setShowVerifyEmail } from '../../../../slices/profileSlice';
import { LOADING } from '../../../../utils/consts';

import Spinner from '../../../common/spinner/Spinner';
import SettingsRedButton from '../settingsRedButton/SettingsRedButton';

import './profileVerifyEmail.scss';

const ProfileVerifyEmail = () => {
	const dispatch = useDispatch();

	const { sendVerifyEmailToken, verifyUserEmail } = useUserService();
	const [toVerifyCode, setToVerifyCode] = useState('');
	const [verifyError, setVerifyError] = useState('');

	const email = useSelector((state) => state.global.user?.email);
	const verifyToken = useSelector((state) => state.global.verifyToken);
	const verifyTokenSendLoadingStatus = useSelector((state) => state.global.verifyTokenSendLoadingStatus);

	useEffect(() => {
		sendVerifyEmailToken();
		// eslint-disable-next-line
	}, []);

	const verifyEmail = async () => {
		if (toVerifyCode === verifyToken) {
			await verifyUserEmail();
			dispatch(setShowVerifyEmail(false));
			return;
		}
		setVerifyError('Неверный код');
	};

	const repeatVerify = async () => {
		sendVerifyEmailToken();
	};

	const messageContent = verifyToken
		? `На почту ${email} отправлен код. Введите его ниже, что бы подтвердить почту.`
		: 'Время действия кода истекло';

	return (
		<>
			<div className={`black-wrapper active`} onClick={() => dispatch(setShowVerifyEmail(false))}></div>
			<div className="verify-email">
				{verifyTokenSendLoadingStatus === LOADING ? (
					<Spinner small />
				) : (
					<>
						<p className="verify-email__message">{messageContent}</p>
						<input
							value={toVerifyCode}
							onChange={(e) => setToVerifyCode(e.target.value)}
							type="text"
							className="verify-email__input"
							placeholder="Код"
						/>
						<div className="login__error">{verifyError}</div>
						<div className="verify-email__btns">
							<SettingsRedButton onClick={verifyEmail}>Отправить</SettingsRedButton>
							<button onClick={repeatVerify} className="verify-email__verify-repeat">
								Отправить код еще раз
							</button>
						</div>
					</>
				)}
			</div>
		</>
	);
};
export default ProfileVerifyEmail;
