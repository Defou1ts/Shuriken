import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './profileList.scss';

import Spinner from '../../common/spinner/Spinner';
import ProfileListItem from '../profileListItem/ProfileListItem';

const ProfileList = () => {
    const notesTypes = useSelector(state => state.profile.notesTypes);
    const notes = useSelector(state => state.global.userData.notes);
    const activeNotesFilter = useSelector(
        state => state.profile.activeNotesFilter
    );

    const filterNotes = notes => {
        if (activeNotesFilter === 'all') return Object.values(notes);
        return Object.values(notes).filter(
            item => item.note === activeNotesFilter
        );
    };

    const renderNotes = notes => {
        return notes.map(({ anime, note }) => {
            let color = '';
            let text = '';
            for (let noteType of notesTypes) {
                if (noteType.name === note) {
                    color = noteType.color;
                    text = noteType.text;
                }
            }
            return (
                <ProfileListItem
                    key={uuidv4()}
                    anime={anime}
                    color={color}
                    text={text}
                />
            );
        });
    };

    if (!notes) return <Spinner />;

    const filteredNotes = filterNotes(notes);
    const renderedNotes = renderNotes(filteredNotes);

    return <div className='profile__list'>{renderedNotes}</div>;
};
export default ProfileList;
