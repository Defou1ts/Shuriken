import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../slices/globalSlice';

import AppRouter from '../common/appRouter/AppRouter';
import Header from '../common/header/Header';
import MobileMenu from '../common/mobileMenu/MobileMenu';
import LoginForm from '../loginPage/loginForm/LoginForm';
import { useUserService } from '../../services/auth/user.service';

const App = () => {
    //TODO: ADD ERROR MESSAGE!

    const dispatch = useDispatch();
    const isMobile = useSelector((state) => state.global.isMobile);
    const showLoginForm = useSelector((state) => state.global.showLoginForm);

    const { getUser } = useUserService();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser();
            dispatch(setUser(user));
        };

        fetchUser();
    });

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
