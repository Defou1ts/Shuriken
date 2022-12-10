import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowProfileSettings } from '../../../../slices/profileSlice';
import { useUserService } from '../../../../services/auth/user.service';

import SettingsRedButton from '../settingsRedButton/SettingsRedButton';

import './profileSettings.scss';

const ProfileSettings = () => {
	const dispatch = useDispatch();
	const { exit, uploadUserImage, validatePassword, changeUserPassword } = useUserService();

	const [image, setImage] = useState(null);
	const [src, setSrc] = useState(null);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');
	const [oldPasswordValidationMessage, setOldPasswordValidationMessage] = useState('');
	const [validationMessage, setValidationMessage] = useState('');

	const showProfileSettings = useSelector((state) => state.profile.showProfileSettings);

	if (image) {
		const fr = new FileReader();

		fr.onload = () => {
			setSrc(fr.result);
		};

		fr.readAsDataURL(image);
	}

	const handleExit = () => {
		dispatch(setShowProfileSettings(false));
		exit();
	};

	const handleSave = async () => {
		if (image) {
			const formData = new FormData();
			formData.append('file', image, image.name);
			await uploadUserImage(formData);
			dispatch(setShowProfileSettings(false));
		}

		if (oldPassword && newPassword && confirmNewPassword) {
			const res = await validatePassword(oldPassword);
			if (res.error) {
				setOldPasswordValidationMessage(res.message);
				return;
			}
			if (newPassword !== confirmNewPassword) {
				setOldPasswordValidationMessage('');
				setValidationMessage('Пароли должны совпадать');
				return;
			}
			setOldPasswordValidationMessage('');
			setValidationMessage('');
			dispatch(setShowProfileSettings(false));
			await changeUserPassword(newPassword);
		}
	};

	return (
		<>
			<div
				className={`black-wrapper ${showProfileSettings ? 'active' : ''}`}
				onClick={() => dispatch(setShowProfileSettings(false))}
			></div>
			<div className="settings">
				<div className="settings__header">
					<h3 className="settings__title">Основное</h3>
					<div onClick={() => dispatch(setShowProfileSettings(false))} className="settings__close">
						<span></span>
					</div>
				</div>
				<div className="settings__content">
					<p className="settings__change-field">Смена фото</p>
					<div className="settings__uploaded-image">{src && <img src={src} alt="change profile" />}</div>
					<p className="settings__change-image-field">
						<label htmlFor="settings__input">
							Нажмите сюда
							<input
								type="file"
								id="settings__input"
								className="settings__photo-input"
								onChange={(e) => setImage(e.target.files[0])}
							/>
						</label>{' '}
						для загрузки новой фотографии
					</p>
					<p className="settings__change-field">Смена пароля</p>
					<div className="settings__change-password-fields">
						<label htmlFor="old-password-change" className="settings__change-label">
							Старый пароль
						</label>
						<input
							onChange={(e) => setOldPassword(e.target.value)}
							value={oldPassword}
							type="password"
							id="old-password-change"
							className="login__input"
							placeholder="Старый пароль"
						/>
						<div className="login__error">{oldPasswordValidationMessage}</div>
						<label htmlFor="new-password-change" className="settings__change-label">
							Новый пароль
						</label>
						<input
							onChange={(e) => setNewPassword(e.target.value)}
							value={newPassword}
							type="password"
							id="new-password-change"
							className="login__input"
							placeholder="Новый пароль"
						/>
						<label htmlFor="new-password-repeat-change" className="settings__change-label">
							Подтверждение пароля
						</label>
						<input
							onChange={(e) => setConfirmNewPassword(e.target.value)}
							value={confirmNewPassword}
							type="password"
							id="new-password-repeat-change"
							className="login__input"
							placeholder="Повторите свой пароль"
						/>
						<div className="login__error">{validationMessage}</div>
					</div>
				</div>
				<div className="settings__btns">
					<SettingsRedButton handleSave={handleSave}>Сохранить</SettingsRedButton>
					<button onClick={handleExit} className="settings__quit">
						Выход
					</button>
				</div>
			</div>
		</>
	);
};
export default ProfileSettings;
