import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../common/spinner/Spinner';

import './catalogListItem.scss';

const CatalogListItem = ({ title, poster, id, year, kind }) => {
	const notes = useSelector((state) => state.global.user?.notes);
	const notesTypes = useSelector((state) => state.profile.notesTypes);

	const renderNote = () => {
		if (!notes) {
			return;
		}
		let color = '';
		let text = '';
		for (const note of notes) {
			if (note.animeId === +id) {
				for (const noteType of notesTypes) {
					if (noteType.name === note.note) {
						color = noteType.color;
						text = noteType.text;
					}
				}
				return (
					<div style={{ backgroundColor: color }} className="catalog__item-note">
						{text}
					</div>
				);
			}
		}
	};

	const renderedKind = kind.toUpperCase();
	const renderedNote = renderNote();

	return (
		<Link to={`/anime/${id}`} className="catalog__item">
			<div className="catalog__item-image">
				<img src={poster} alt={title} />
				{renderedNote}
			</div>
			<div className="catalog__item-title">{title}</div>
			<div className="catalog__item-info">
				{renderedKind}, {year}
			</div>
		</Link>
	);
};
export default CatalogListItem;
