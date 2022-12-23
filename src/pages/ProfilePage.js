import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';

import ProfileHeader from '../components/profilePage/porifleHeader/ProfileHeader';
import ProfileMenu from '../components/profilePage/profileMenu/ProfileMenu';

const ProfilePage = () => {
	const { username } = useSelector((state) => state.global.user);

	return (
		<div className="profile">
			<Helmet>
				<title>{username} | Профиль</title>
				<meta name="description" content="Каталог всех аниме-сериалов для поиска и просмотра онлайн" />
			</Helmet>
			<div className="container">
				<ProfileHeader />
				<ProfileMenu />
			</div>
		</div>
	);
};
export default ProfilePage;
