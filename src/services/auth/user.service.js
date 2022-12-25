import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { ERROR, IDLE, LOADING, SUCCESS, API_BASE } from '../../utils/consts';
import { setProfileMessange, setShowProfileMessange } from '../../slices/profileSlice';
import axios from 'axios';
import {
	setAuthLoadingStatus,
	setShowLoginForm,
	setRegisterLoadingStatus,
	setRegisterErrorMessage,
	setUser,
	setWriteLoadingStatus,
	setFileLoadingStatus,
	setUpdateReviewLoadingStatus,
	setVerifyTokenSendLoadingStatus,
	setVerifyToken,
	setVerifyLoadingStatus,
	setChangePasswordLoadingStatus,
} from '../../slices/globalSlice';

export const useUserService = () => {
	const { request } = useHttp();
	const dispatch = useDispatch();

	const login = async ({ email, password }) => {
		dispatch(setAuthLoadingStatus(LOADING));
		const res = await request(`${API_BASE}/auth/login`, 'POST', {
			email,
			password,
		});
		if (res.error) {
			dispatch(setAuthLoadingStatus(ERROR));
			return;
		}
		localStorage.setItem('access_token', res.access_token);
		dispatch(setShowLoginForm(false));
		dispatch(setAuthLoadingStatus('idle'));
		const user = await getUser();
		dispatch(setUser(user));
	};

	const register = async ({ username, email, password }) => {
		dispatch(setRegisterLoadingStatus(LOADING));
		const res = await request(`${API_BASE}/auth/register`, 'POST', {
			username,
			email,
			password,
		});
		if (res.error) {
			dispatch(setRegisterErrorMessage(res.message));
			return;
		}
		dispatch(setRegisterLoadingStatus(IDLE));
		dispatch(setUser(res));
		await login({ email, password });
	};

	const exit = () => {
		dispatch(setUser(null));
		localStorage.removeItem('access_token');
	};

	const getUser = async () => {
		const access_token = localStorage.getItem('access_token');
		if (access_token) {
			const res = await request(`${API_BASE}/auth/user`, 'GET', null, {
				Authorization: `Bearer ${access_token}`,
			});
			return res;
		}
	};

	const addToUserNotes = async (note, anime) => {
		dispatch(setWriteLoadingStatus(LOADING));
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			dispatch(setWriteLoadingStatus(ERROR));
			setTimeout(() => {
				dispatch(setWriteLoadingStatus(IDLE));
			}, 2000);
			return;
		}
		const res = await request(
			`${API_BASE}/auth/notes/add`,
			'POST',
			{
				note,
				animeId: Number(anime.id),
				anime,
			},
			{
				Authorization: `Bearer ${access_token}`,
			}
		);
		if (res.error) {
			dispatch(setWriteLoadingStatus(ERROR));
			return;
		}
		if (res.username) {
			dispatch(setUser(res));
			dispatch(setWriteLoadingStatus(IDLE));
		}
	};

	const createReview = async (animeId, description) => {
		dispatch(setUpdateReviewLoadingStatus(LOADING));
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			dispatch(setUpdateReviewLoadingStatus(ERROR));
			return;
		}
		const res = await request(
			`${API_BASE}/reviews/create`,
			'POST',
			{
				animeId: Number(animeId),
				description,
			},
			{
				Authorization: `Bearer ${access_token}`,
			}
		);
		if (res.error) {
			dispatch(setUpdateReviewLoadingStatus(ERROR));
			return;
		}
		dispatch(setUpdateReviewLoadingStatus(IDLE));
	};

	const likeReview = async (reviewId) => {
		dispatch(setUpdateReviewLoadingStatus(LOADING));
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			dispatch(setUpdateReviewLoadingStatus(ERROR));
			return;
		}
		const res = await request(`${API_BASE}/reviews/like/${reviewId}`, 'POST', null, {
			Authorization: `Bearer ${access_token}`,
		});
		if (res.error) {
			dispatch(setUpdateReviewLoadingStatus(ERROR));
			return;
		}
		const user = await getUser();
		dispatch(setUser(user));
		dispatch(setUpdateReviewLoadingStatus(IDLE));
	};

	const disLikeReview = async (reviewId) => {
		dispatch(setUpdateReviewLoadingStatus(LOADING));
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			dispatch(setUpdateReviewLoadingStatus(ERROR));
			return;
		}
		const res = await request(`${API_BASE}/reviews/disLike/${reviewId}`, 'POST', null, {
			Authorization: `Bearer ${access_token}`,
		});
		if (res.error) {
			dispatch(setUpdateReviewLoadingStatus(ERROR));
			return;
		}
		const user = await getUser();
		dispatch(setUser(user));
		dispatch(setUpdateReviewLoadingStatus(IDLE));
	};

	const uploadUserImage = async (multipartFormFile) => {
		dispatch(setFileLoadingStatus(LOADING));
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			dispatch(setFileLoadingStatus(ERROR));
			return;
		}
		const { data } = await axios.post(`${API_BASE}/files/uploadUserImage`, multipartFormFile, {
			headers: { Authorization: `Bearer ${access_token}` },
		});
		if (!data) {
			dispatch(setFileLoadingStatus(ERROR));
			return;
		}
		if (data) {
			dispatch(setUser(data));
			dispatch(setFileLoadingStatus(SUCCESS));
			dispatch(setShowProfileMessange(true));
			dispatch(setProfileMessange('Настройки успешно сохранены'));
		}
		setTimeout(() => {
			dispatch(setFileLoadingStatus(IDLE));
			dispatch(setShowProfileMessange(false));
			dispatch(setProfileMessange(''));
		}, 3000);
	};

	const sendVerifyEmailToken = async () => {
		dispatch(setVerifyTokenSendLoadingStatus(LOADING));
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			dispatch(setVerifyTokenSendLoadingStatus(ERROR));
			return;
		}
		const res = await request(`${API_BASE}/mail/sendVerify`, 'GET', null, {
			Authorization: `Bearer ${access_token}`,
		});
		if (res.error) {
			dispatch(setVerifyTokenSendLoadingStatus(ERROR));
			return;
		}
		dispatch(setVerifyToken(res.verifyKey));
		setTimeout(() => {
			dispatch(setVerifyToken(null));
		}, 120000);
		dispatch(setVerifyTokenSendLoadingStatus(IDLE));
	};

	const verifyUserEmail = async () => {
		dispatch(setVerifyLoadingStatus(LOADING));
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			dispatch(setVerifyLoadingStatus(ERROR));
			return;
		}
		const res = await request(`${API_BASE}/auth/verifyEmail`, 'GET', null, {
			Authorization: `Bearer ${access_token}`,
		});
		if (res.error) {
			dispatch(setVerifyLoadingStatus(ERROR));
			return;
		}
		if (res.username) {
			dispatch(setUser(res));
			dispatch(setShowProfileMessange(true));
			dispatch(setProfileMessange('Ваша почта успешно подтверждена!'));
		}
		dispatch(setVerifyLoadingStatus(SUCCESS));
		dispatch(setVerifyToken(null));
		setTimeout(() => {
			dispatch(setVerifyLoadingStatus(IDLE));
			dispatch(setShowProfileMessange(false));
			dispatch(setProfileMessange(''));
		}, 3000);
	};

	const validatePassword = async (password) => {
		const access_token = localStorage.getItem('access_token');
		if (access_token) {
			const res = await request(`${API_BASE}/auth/validatePassword/${password}`, 'POST', null, {
				Authorization: `Bearer ${access_token}`,
			});
			return res;
		}
	};

	const changeUserPassword = async (password) => {
		dispatch(setChangePasswordLoadingStatus(LOADING));
		const access_token = localStorage.getItem('access_token');
		if (!access_token) {
			dispatch(setChangePasswordLoadingStatus(ERROR));
			return;
		}
		const res = await request(`${API_BASE}/auth/changePassword/${password}`, 'POST', null, {
			Authorization: `Bearer ${access_token}`,
		});
		if (!res.username) {
			dispatch(setChangePasswordLoadingStatus(ERROR));
			return;
		}
		if (res.username) {
			dispatch(setUser(res));
			dispatch(setChangePasswordLoadingStatus(SUCCESS));
			dispatch(setShowProfileMessange(true));
			dispatch(setProfileMessange('Настройки успешно сохранены'));
		}
		setTimeout(() => {
			dispatch(setChangePasswordLoadingStatus(IDLE));
			dispatch(setShowProfileMessange(false));
			dispatch(setProfileMessange(''));
		}, 3000);
	};

	return {
		login,
		getUser,
		register,
		exit,
		addToUserNotes,
		uploadUserImage,
		createReview,
		likeReview,
		disLikeReview,
		sendVerifyEmailToken,
		verifyUserEmail,
		validatePassword,
		changeUserPassword,
	};
};
