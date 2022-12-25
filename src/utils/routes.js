import {
	HOMEPAGE_ROUTE,
	CATALOG_ROUTE,
	PROFILE_ROUTE,
	ANIME_ROUTE,
	LOGIN_ROUTE,
	REGISTER_ROUTE,
	NOT_FOUND_ROUTE,
	SERVER_ERROR_ROUTE,
} from '../utils/consts';

import Homepage from '../pages/Homepage';
import Loginpage from '../pages/Loginpage';
import RegisterPage from '../pages/RegisterPage';
import AnimePage from '../pages/AnimePage';
import ProfilePage from '../pages/ProfilePage';
import ErrorWithCode from '../pages/ErrorWithCode';
import CatalogPage from '../pages/CatalogPage';

export const generalRoutes = [
	{
		path: HOMEPAGE_ROUTE,
		Component: <Homepage />,
	},
	{
		path: CATALOG_ROUTE,
		Component: <CatalogPage />,
	},

	{
		path: ANIME_ROUTE,
		Component: <AnimePage />,
	},
	{
		path: NOT_FOUND_ROUTE,
		Component: <ErrorWithCode code={404} />,
	},
	{
		path: SERVER_ERROR_ROUTE,
		Component: <ErrorWithCode code={500} />,
	},
];

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: <Loginpage />,
	},
	{
		path: REGISTER_ROUTE,
		Component: <RegisterPage />,
	},
];

export const privateRoutes = [
	{
		path: PROFILE_ROUTE,
		Component: <ProfilePage />,
	},
];
