import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../slices/globalSlice';
import { Helmet } from 'react-helmet';
import { useUserService } from '../../services/auth/user.service';

import AppRouter from '../common/appRouter/AppRouter';
import Header from '../common/header/Header';
import MobileMenu from '../common/mobileMenu/MobileMenu';
import LoginForm from '../loginPage/loginForm/LoginForm';
import ErrorBoundary from '../../pages/ServerError';

const App = () => {
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
			<Helmet>
				<meta name="description" content="Аниме портал для онлайн просмотра аниме. Главная страница" />
				<title>丂huriken</title>
			</Helmet>
			<Header />
			{isMobile ? createPortal(<MobileMenu />, document.getElementById('root')) : null}
			{showLoginForm ? createPortal(<LoginForm />, document.getElementById('root')) : null}
			<ErrorBoundary>
				<AppRouter />
			</ErrorBoundary>
		</BrowserRouter>
	);
};

export default App;
