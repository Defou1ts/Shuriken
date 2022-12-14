import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { setSelectedTranslation } from '../../../slices/animeSlice';

import './animePlayer.scss';

import Spinner from '../../common/spinner/Spinner';

const AnimePlayer = () => {
	const dispatch = useDispatch();

	const link = useSelector((state) => state.anime.currentAnime.link);
	const title = useSelector((state) => state.anime.currentAnime.title);
	const selectedTranslation = useSelector((state) => state.anime.selectedTranslation);
	const animeLoadingStatus = useSelector((state) => state.anime.animeLoadingStatus);
	const translationsList = useSelector((state) => state.anime.voiceTranslations);

	const selectTranslation = (e) => {
		dispatch(setSelectedTranslation(+e.target.id));
	};

	if (animeLoadingStatus === 'loading') {
		return <Spinner small />;
	}

	const renderTranslationsList = (translations) => {
		return translations.map(({ title, id }) => (
			<li
				onClick={(e) => selectTranslation(e)}
				key={uuidv4()}
				id={id}
				className={`player__translations-item 
            ${id === selectedTranslation ? 'active' : ''}`}
			>
				{title}
			</li>
		));
	};

	const renderedTranslations = renderTranslationsList(translationsList);

	return (
		<div className="player">
			<h2 className="player__title">{`Смотреть аниме «${title}» онлайн`}</h2>
			<div className="player__row">
				<div className="player__box">
					<iframe
						id="kodik-player"
						title="Kodik Player"
						src={`${link}?&translations=false&only_season=true&episode=1`}
						width="100%"
						height="100%"
						frameBorder="0"
						allowFullScreen
						allow="autoplay *; fullscreen *"
					></iframe>
				</div>
				<div className="player__settings">
					<div className="player__header">
						<div className="player__body">
							<div className="player__translation active">
								<div className="player__header-title">Озвучка</div>
								<ul className="player__translations-list">{renderedTranslations}</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimePlayer;
