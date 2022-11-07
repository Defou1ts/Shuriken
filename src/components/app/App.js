import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { setUser, setUserData } from '../../slices/globalSlice';

import AppRouter from '../appRouter/AppRouter';
import Header from '../header/Header';
import MobileMenu from '../mobileMenu/MobileMenu';
import LoginForm from '../loginForm/LoginForm';
import Spinner from '../spinner/Spinner';

const App = () => {
    //TODO: ADD ERROR MESSAGE!

    const dispatch = useDispatch();
    const isMobile = useSelector(state => state.global.isMobile);
    const showLoginForm = useSelector(state => state.global.showLoginForm);
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            dispatch(setUser(user));

            const db = getDatabase();
            const userRef = ref(db, 'users/' + user.uid);
            onValue(userRef, snapshot => {
                dispatch(setUserData(snapshot.val()));
            });
        }
    }, [user, dispatch]);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <h1>Error</h1>;
    }

    return (
        <BrowserRouter>
            <Header />
            {isMobile
                ? createPortal(<MobileMenu />, document.getElementById('root'))
                : null}
            {showLoginForm
                ? createPortal(<LoginForm />, document.getElementById('root'))
                : null}
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
