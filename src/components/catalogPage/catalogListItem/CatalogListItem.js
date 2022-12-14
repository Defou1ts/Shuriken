import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './catalogListItem.scss';

import catalogStar from '../../../assets/catalogstar.svg';

const CatalogListItem = ({ title, poster, id, year, kind, description, rating, titleEn, episodesTotal }) => {
	const notes = useSelector((state) => state.global.user?.notes);
	const notesTypes = useSelector((state) => state.profile.notesTypes);
	const isMobile = useSelector((state) => state.global.isMobile);

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
			{!isMobile && (
				<>
					<div className="catalog__item-title">{title}</div>
					<div className="catalog__item-info">
						{renderedKind}, {year}
					</div>
				</>
			)}
			{isMobile && (
				<div className="catalog__item-content">
					<div className="catalog__item-title">{title}</div>
					<div className="catalog__item-titleEn">{titleEn}</div>
					<div className="catalog__item-info">
						<span>{episodesTotal} эп.</span>
						<span>{year}</span>
						<span>
							{rating} <img src={catalogStar} alt="Рейтинг" />
						</span>
					</div>
					<div className="catalog__item-descr">{description}</div>
				</div>
			)}
		</Link>
	);
};
export default CatalogListItem;
