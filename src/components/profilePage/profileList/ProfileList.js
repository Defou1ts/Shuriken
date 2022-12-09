import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './profileList.scss';

import ProfileListItem from '../profileListItem/ProfileListItem';

const ProfileList = () => {
	const notesTypes = useSelector((state) => state.profile.notesTypes);
	const notes = useSelector((state) => state.global.user?.notes);
	const activeNotesFilter = useSelector((state) => state.profile.activeNotesFilter);

	const filterNotes = (notes) => {
		if (activeNotesFilter === 'all') return notes;
		return notes.filter((item) => item.note === activeNotesFilter);
	};

	const renderNotes = (notes) => {
		return notes.map(({ anime, note }) => {
			let color = '';
			let text = '';
			for (let noteType of notesTypes) {
				if (noteType.name === note) {
					color = noteType.color;
					text = noteType.text;
				}
			}
			return <ProfileListItem key={uuidv4()} anime={anime} color={color} text={text} />;
		});
	};

	if (notes.length === 0)
		return (
			<p className="profile__notes-not-found">
				У вас пока ничего нет в закладках. Вы можете что-нибудь подобрать себе в каталоге
			</p>
		);

	const filteredNotes = filterNotes(notes);
	const renderedNotes = renderNotes(filteredNotes);

	return <div className="profile__list">{renderedNotes}</div>;
};
export default ProfileList;
