import { useSelector, useDispatch } from 'react-redux';
import { fetchAnime, fetchTranslations } from '../../../slices/animeSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useLog } from '../../../services/logService/log.service';
import { useUserService } from '../../../services/auth/user.service';

import './animeItem.scss';

import Spinner from '../../common/spinner/Spinner';

import playBtn from '../../../assets/playicon.svg';
import addFavIcon from '../../../assets/addfavicon.svg';
import rateIcon from '../../../assets/rateicon.svg';
import mobileAddFavIcon from '../../../assets/mobilefavicon.svg';
import mobileRateIcon from '../../../assets/mobilerateicon.svg';
import ratingIcon from '../../../assets/ratingIcon.svg';

const AnimeItem = () => {
	const dispatch = useDispatch();
	const [showNotesMenu, setShowNotesMenu] = useState(false);
	const { addToUserNotes } = useUserService();
	const { logDate, logStatus } = useLog();

	const { id } = useParams();

	const isMobile = useSelector((state) => state.global.isMobile);
	const animeLoadingStatus = useSelector((state) => state.anime.animeLoadingStatus);
	const writeLoadingStatus = useSelector((state) => state.global.writeLoadingStatus);
	const selectedTranslation = useSelector((state) => state.anime.selectedTranslation);
	const notesTypes = useSelector((state) => state.profile.notesTypes);
	const notes = useSelector((state) => state.global.user?.notes);
	const currentAnime = useSelector((state) => state.anime.currentAnime);
	const {
		title,
		poster,
		description,
		screenshots,
		rating,
		kind,
		episodesAired,
		episodesTotal,
		status,
		genres,
		year,
		createdAt,
		studios,
		mpaa,
		duration,
	} = currentAnime;

	useEffect(() => {
		dispatch(fetchAnime({ id, selectedTranslation }));
	}, [id, selectedTranslation, dispatch]);

	useEffect(() => {
		dispatch(fetchTranslations(id));
	}, [id, dispatch]);

	if (animeLoadingStatus === 'loading') {
		return <Spinner />;
	}

	if (animeLoadingStatus === 'error') {
		return <h1>Ошибка</h1>;
	}

	const addToNotes = (note, anime) => {
		setShowNotesMenu(false);
		addToUserNotes(note, anime);
	};

	const scrollToPlayer = () => {
		window.scrollTo({
			top: document.getElementById('kodik-player').offsetTop - 200,
			behavior: 'smooth',
		});
	};

	const openNotesModal = (e) => {
		if (e.target.classList.contains('anime-item__adv-btn') || e.target.localName === 'img') {
			setShowNotesMenu(true);
		} else {
			setShowNotesMenu(false);
		}
	};

	const renderScreenshots = (screenshots) =>
		screenshots.map((screen) => <img key={uuidv4()} src={screen} alt={title} />);

	const renderNotes = (notesTypes) =>
		notesTypes.map(({ name, text }) => {
			let className = 'anime-item__note';
			if (notes) {
				notes.forEach((note) => {
					if (note.note === name && note.animeId === +id) {
						className += ' active';
					}
				});
			}
			return (
				<p
					onClick={() => {
						addToNotes(name, currentAnime);
					}}
					key={uuidv4()}
					data-value={name}
					className={className}
				>
					{text}
				</p>
			);
		});

	const renderedScreenshots = screenshots ? renderScreenshots(screenshots) : <Spinner />;
	const date = new Date(createdAt);
	const renderedDate = logDate(date);
	const renderedStatus = logStatus(status);
	const renderedNotesTypes = <div className="anime-item__notes">{renderNotes(notesTypes)}</div>;

	return (
		<div className="anime-item" onClick={(e) => openNotesModal(e)}>
			<div className="anime-item__row">
				<div className="anime-item__column">
					{isMobile && <h2 className="anime-item__title">{title}</h2>}
					<div className="anime-item__poster">
						<img src={poster} alt="Anime poster" />
						<div className="anime-item__rating">
							<img src={ratingIcon} alt="Rating" />
							{rating}
						</div>
					</div>
					<div className="anime-item__btns">
						<div onClick={() => scrollToPlayer()} className="anime-item__play-btn">
							Cмотреть онлайн
							<img src={playBtn} alt="play icon" />
						</div>
						<div onClick={(e) => openNotesModal(e)} className="anime-item__adv-btn notes">
							Добавить в закладки
							<img src={isMobile ? mobileAddFavIcon : addFavIcon} alt="add to favourites btn" />
							{showNotesMenu && renderedNotesTypes}
						</div>
						{writeLoadingStatus === 'error' ? (
							<p className="login__error center">Вы не авторизованы</p>
						) : null}
						{writeLoadingStatus === 'loading' ? <Spinner small /> : null}
						<div className="anime-item__adv-btn review">
							Написать отзыв
							<img src={isMobile ? mobileRateIcon : rateIcon} alt="write rate" />
						</div>
					</div>
				</div>
				<div className="anime-item__column">
					{!isMobile && <h2 className="anime-item__title">{title}</h2>}

					<ul className="anime-item__descr-list">
						<li className="anime-item__descr-item">
							<p>Тип</p>
							<p>{kind ? kind.toUpperCase() : null}</p>
						</li>
						<li className="anime-item__descr-item">
							<p>Эпизоды</p>
							<p>
								{episodesAired} / {episodesTotal === 0 ? '?' : episodesTotal}
							</p>
						</li>
						<li className="anime-item__descr-item">
							<p>Статуc</p>
							<p>{renderedStatus}</p>
						</li>
						<li className="anime-item__descr-item">
							<p>Жанр</p>
							<p>{genres ? genres.join(', ') : null}</p>
						</li>
						<li className="anime-item__descr-item">
							<p>Сезон</p>
							<p>{year}</p>
						</li>
						<li className="anime-item__descr-item">
							<p>Выпуск</p>
							<p>{renderedDate}</p>
						</li>
						<li className="anime-item__descr-item">
							<p>Студия</p>
							<p>{studios ? studios.join(', ') : null}</p>
						</li>
						<li className="anime-item__descr-item">
							<p>Рейтинг MPAA </p>
							<p>{mpaa}</p>
						</li>
						<li className="anime-item__descr-item">
							<p>Длительность</p>
							<p>{duration} мин. ~ серия</p>
						</li>
					</ul>
					<p className="anime-item__description">{description}</p>
				</div>
				<div className="anime-item__column">
					<h3 className="anime-item__screen-title">Кадры из релиза</h3>
					<div className="anime-item__screenshots">{renderedScreenshots}</div>
				</div>
			</div>
		</div>
	);
};

export default AnimeItem;
