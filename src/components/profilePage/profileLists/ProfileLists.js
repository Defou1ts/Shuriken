import './profileLists.scss';

import ProfileList from '../profileList/ProfileList';
import ProfileSidebar from '../profileSidebar/ProfileSidebar';

const ProfileLists = () => {
	return (
		<div className="profile__lists">
			<ProfileSidebar />
			<ProfileList />
		</div>
	);
};
export default ProfileLists;
