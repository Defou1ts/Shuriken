import ProfileHeader from '../components/profilePage/porifleHeader/ProfileHeader';
import ProfileMenu from '../components/profilePage/profileMenu/ProfileMenu';

const ProfilePage = () => {
    return (
        <div className='profile'>
            <div className='container'>
                <ProfileHeader />
                <ProfileMenu />
            </div>
        </div>
    );
};
export default ProfilePage;
