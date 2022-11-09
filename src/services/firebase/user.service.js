import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from 'firebase/auth';
import { getDatabase, ref, child, get, set } from 'firebase/database';
import {
    setUser,
    setAuthLoadingStatus,
    setRegisterLoadingStatus,
    setRegisterErrorMessage,
    setWriteLoadingStatus,
} from '../../slices/globalSlice';
import { setShowLoginForm } from '../../slices/globalSlice';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const useUserService = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.global.user);
    const userData = useSelector(state => state.global.userData);

    const login = ({ email, password }) => {
        const auth = getAuth();
        dispatch(setAuthLoadingStatus('loading'));
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                dispatch(setShowLoginForm(false));
                dispatch(setAuthLoadingStatus('idle'));
                const user = userCredential.user;
                dispatch(setUser(user));
                <Navigate to='/' />;
            })
            .catch(() => {
                dispatch(setAuthLoadingStatus('error'));
            });
    };

    const exit = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                dispatch(setUser(null));
                <Navigate to='/' />;
            })
            .catch(error => {
                console.log(error);
            });
    };

    const register = async ({ username, email, password }) => {
        const auth = getAuth();
        dispatch(setRegisterLoadingStatus('loading'));

        const isRepeatUsername = await checkUserName(username);
        if (isRepeatUsername) {
            dispatch(setRegisterErrorMessage('такой логин уже существует'));
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setRegisterLoadingStatus('idle'));
                dispatch(setUser(user));
                writeUserData('username', username, user.uid);
                <Navigate to='/' />;
            })
            .catch(e => {
                dispatch(setRegisterLoadingStatus('error'));
                dispatch(setRegisterErrorMessage(e.message));
            });
    };

    const checkUserName = async username => {
        const dbRef = ref(getDatabase());
        return await get(child(dbRef, `users`))
            .then(snapshot => {
                if (snapshot.exists()) {
                    const users = snapshot.val();
                    let isRepeatUsername = false;
                    for (let userUid in users) {
                        if (users[userUid].username === username) {
                            isRepeatUsername = true;
                            break;
                        }
                    }
                    return isRepeatUsername;
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const writeUserData = (key, value, id = user.uid) => {
        const db = getDatabase();
        set(ref(db, 'users/' + id), {
            [key]: value,
        });
    };

    const writeUserNotes = async (note, anime) => {
        dispatch(setWriteLoadingStatus('loading'));
        if (userData.notes) {
            const db = getDatabase();
            await set(ref(db, `users/${user.uid}/notes`), {
                ...userData.notes,
                [anime.id]: {
                    note: note,
                    translation: anime.translation.id,
                },
            });
        } else {
            const db = getDatabase();
            await set(ref(db, `users/${user.uid}/notes`), {
                [anime.id]: {
                    note: note,
                    translation: anime.translation.id,
                },
            });
        }

        dispatch(setWriteLoadingStatus('idle'));
    };

    return {
        checkUserName,
        login,
        register,
        writeUserNotes,
        writeUserData,
        exit,
    };
};
