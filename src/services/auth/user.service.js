import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { ERROR, IDLE, LOADING, SUCCESS, API_BASE } from '../../utils/consts';
import {
    setAuthLoadingStatus,
    setShowLoginForm,
    setRegisterLoadingStatus,
    setRegisterErrorMessage,
    setUser,
    setWriteLoadingStatus,
    setFileLoadingStatus,
    setCreateReviewLoadingStatus,
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
        <Navigate to="/" />;
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

    const createReview = async (animeId, description ) => {
        dispatch(setCreateReviewLoadingStatus(LOADING));
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            dispatch(setCreateReviewLoadingStatus(ERROR));
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
            dispatch(setCreateReviewLoadingStatus(ERROR));
            return;
        }
        //ADD DISPATCH SET REVIEWS
        dispatch(setCreateReviewLoadingStatus(IDLE));
    };

    // const findReviewsByAnime = async (animeId) => {
    //     const res = await request(`${API_BASE}/reviews/byAnime/${animeId}`);
    //     return res;
    // };

    const likeReview = async (reviewId) => {
        //SET LOADING
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            //SET ERROR
            return;
        }
        const res = await request(
            `${API_BASE}/reviews/like/${reviewId}`,
            'POST',
            null,
            {
                Authorization: `Bearer ${access_token}`,
            }
        );
        if (res.error) {
            //SET ERROR
            return;
        }
        const user = await getUser();
        dispatch(setUser(user));
        //SET IDDLE
    };

    const disLikeReview = async (reviewId) => {
        //SET LOADING
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            //SET ERROR
            return;
        }
        const res = await request(
            `${API_BASE}/reviews/disLike/${reviewId}`,
            'POST',
            null,
            {
                Authorization: `Bearer ${access_token}`,
            }
        );
        if (res.error) {
            //SET ERROR
            return;
        }
        const user = await getUser();
        dispatch(setUser(user));
        //SET IDDLE
    };

    const uploadUserImage = async (multipartFormFile) => {
        dispatch(setFileLoadingStatus(LOADING));
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            dispatch(setFileLoadingStatus(ERROR));
            return;
        }
        const res = await request(
            `${API_BASE}/files/uploadUserImage`,
            'POST',
            {
                body: multipartFormFile,
            },
            {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'multipart/form-data',
            }
        );
        if (res.error) {
            dispatch(setFileLoadingStatus(ERROR));
            return;
        }
        if (res.username) {
            dispatch(setUser(res));
            dispatch(setFileLoadingStatus(SUCCESS));
        }
        setTimeout(() => {
            dispatch(setFileLoadingStatus(IDLE));
        }, 1000);
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
        // findReviewsByAnime,
    };
};
