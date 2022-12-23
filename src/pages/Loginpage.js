import { Helmet } from 'react-helmet';

import LoginForm from '../components/loginPage/loginForm/LoginForm';

const Loginpage = () => {
	return (
		<>
			<Helmet>
				<meta name="description" content="Авторизация" />
				<title>丂huriken | Авторизация</title>
			</Helmet>
			<LoginForm />
		</>
	);
};

export default Loginpage;
