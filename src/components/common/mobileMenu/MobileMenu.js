import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setShowLoginForm, setIsActiveBurger } from '../../../slices/globalSlice';
import { useUserService } from '../../../services/auth/user.service';
import { PROFILE_ROUTE, LOGIN_ROUTE, CATALOG_ROUTE, API_IMAGES } from '../../../utils/consts';

import notificationsIcon from '../../../assets/notifications.svg';
import profileIcon from '../../../assets/profileIcon.svg';
import catalogIcon from '../../../assets/catalogIcon.svg';
import quitIcon from '../../../assets/quit.svg';

import './mobileMenu.scss';

const MobileMenu = () => {
	const dispatch = useDispatch();
	const { exit } = useUserService();

	const user = useSelector((state) => state.global.user);
	const isActiveBurger = useSelector((state) => state.global.isActiveBurger);
	const location = useLocation();

	useEffect(() => {
		dispatch(setIsActiveBurger(false));
		// eslint-disable-next-line
	}, [location.key]);

	return (
		<>
			<div
				className={`black-wrapper ${isActiveBurger ? 'active' : ''}`}
				onClick={() => dispatch(setIsActiveBurger(false))}
			></div>
			<div className={`mobile-menu ${isActiveBurger ? 'active' : ''}`}>
				<div className="mobile-menu__header">
					{user ? (
						<>
							<Link to={PROFILE_ROUTE}>
								<img
									className="mobile-menu__user-icon"
									src={`${API_IMAGES}/${user.image}`}
									alt="user icon"
								/>
							</Link>
							<Link className="mobile-menu__user-name" to={PROFILE_ROUTE}>
								{user.username}
							</Link>
							<img className="mobile-menu__notifications" src={notificationsIcon} alt="Notifications" />
						</>
					) : (
						<Link
							className="mobile-menu__login-btn"
							onClick={() => dispatch(setShowLoginForm(true))}
							to={LOGIN_ROUTE}
						>
							Войти
						</Link>
					)}
				</div>
				<div className="mobile-menu__list">
					{user ? (
						<>
							<Link to={PROFILE_ROUTE} className="mobile-menu__link">
								<div className="mobile-menu__image">
									<img src={profileIcon} alt="Profile" />
								</div>
								Мой профиль
							</Link>
						</>
					) : null}
					<Link to={CATALOG_ROUTE} className="mobile-menu__link">
						<div className="mobile-menu__image">
							<img src={catalogIcon} alt="Catalog" />
						</div>
						Каталог
					</Link>
				</div>
				{user ? (
					<button className="mobile-menu__quit" onClick={exit}>
						<img src={quitIcon} alt="Quit" />
						Выход
					</button>
				) : null}
			</div>
		</>
	);
};

export default MobileMenu;
