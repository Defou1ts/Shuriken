import { useState } from 'react';
import { useField } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setShowProfileSettings } from '../../../../slices/profileSlice';
import { useUserService } from '../../../../services/auth/user.service';
import { setUser } from '../../../../slices/globalSlice';

import SettingsRedButton from '../settingsRedButton/SettingsRedButton';

import './profileSettings.scss';
import { Navigate } from 'react-router-dom';

const PasswordInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.name}>{label}</label>
			<input {...props} {...field} />
			{meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
		</>
	);
};

const ProfileSettings = () => {
	const dispatch = useDispatch();
	const { exit, uploadUserImage, getUser } = useUserService();

	const [image, setImage] = useState(null);
	const [src, setSrc] = useState(null);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPassword, setConfirmNewPassword] = useState('');

	const showProfileSettings = useSelector((state) => state.profile.showProfileSettings);

	const fileLoadingStatus = useSelector((state) => state.global.fileLoadingStatus);

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
			<Navigate to="/" />;
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
