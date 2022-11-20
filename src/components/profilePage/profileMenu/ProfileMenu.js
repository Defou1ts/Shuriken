import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOption } from '../../../slices/profileSlice';
import { v4 as uuid } from 'uuid';
import './profileMenu.scss';

import ProfileComments from '../profileComments/ProfileComments';
import ProfileFriends from '../profileFriends/ProfileFriends';
import ProfileLists from '../profileLists/ProfileLists';

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const options = useSelector(state => state.profile.options);
    const selectedOption = useSelector(state => state.profile.selectedOption);

    const changeSelectedOption = e => {
        console.log(e.target.textContent);
        dispatch(setSelectedOption(e.target.textContent));
    };

    const renderMenu = option => {
        switch (option) {
            case 'Списки':
                return <ProfileLists />;
            case 'Друзья':
                return <ProfileFriends />;
            case 'Комментарии':
                return <ProfileComments />;
            default:
                break;
        }
    };

    const renderedOptions = options.map(option => (
        <p
            key={uuid()}
            onClick={e => changeSelectedOption(e)}
            className={`profile__menu-item ${
                selectedOption === option ? 'active' : ''
            }`}>
            {option}
        </p>
    ));

    const renderedMenu = renderMenu(selectedOption);

    return (
        <>
            <div className='profile__menu'>
                <div className='profile__menu-list'>{renderedOptions}</div>
            </div>
            {renderedMenu}
        </>
    );
};
export default ProfileMenu;
