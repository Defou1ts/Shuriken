import { Helmet } from 'react-helmet';

import registerBg from '../assets/registerbg.mp4';
import registerBgPoster from '../assets/registerbg.png';

import RegisterForm from '../components/registerPage/registerForm/RegisterForm';

const RegisterPage = () => {
	return (
		<div className="register">
			<Helmet>
				<meta name="description" content="Регистрация" />
				<title>丂huriken | Регистрация</title>
			</Helmet>
			<div className="register__background">
				<video
					src={registerBg}
					alt="register background"
					autoPlay
					muted
					loop
					preload="true"
					poster={registerBgPoster}
				/>
			</div>
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
