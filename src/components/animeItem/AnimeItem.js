import { useSelector, useDispatch } from 'react-redux';
import { fetchAnime } from '../../slices/animeSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Spinner from '../spinner/Spinner';

import './animeItem.scss';

import playBtn from '../../assets/playicon.svg';
import addFavIcon from '../../assets/addfavicon.svg';
import rateIcon from '../../assets/rateicon.svg';
import mobileAddFavIcon from '../../assets/mobilefavicon.svg';
import mobileRateIcon from '../../assets/mobilerateicon.svg';

const AnimeItem = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const isMobile = useSelector((state) => state.global.isMobile);
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
  } = useSelector((state) => state.anime.anime);
  const animeLoadingStatus = useSelector(
    (state) => state.anime.animeLoadingStatus
  );

  useEffect(() => {
    dispatch(fetchAnime(id));
  }, [id]);

  if (animeLoadingStatus === 'loading') {
    return <Spinner />;
  }

  if (animeLoadingStatus === 'error') {
    return <h1>Ошибка</h1>;
  }

  const renderStatus = (status) => {
    switch (status) {
      case 'ongoing':
        return 'Онгоинг';
      case 'anons':
        return 'Анонс';
      case 'released':
        return 'Завершён';
      default:
        break;
    }
  };

  const renderScreenshots = (screenshots) =>
    screenshots.map((screen) => (
      <img key={uuidv4()} src={screen} alt={title} />
    ));

  const renderedStatus = renderStatus(status);

  const renderedScreenshots = screenshots ? (
    renderScreenshots(screenshots)
  ) : (
    <Spinner />
  );

  const date = new Date(createdAt);
  const renderedDate = `
  ${date.getDate()}.
  ${date.getMonth() + 1}.
  ${date.getFullYear()}
  `;

  return (
    <div className="anime-item">
      <div className="anime-item__row">
        <div className="anime-item__column">
          <div className="anime-item__poster">
            <img src={poster} alt="Anime poster" />
          </div>
          <div className="anime-item__btns">
            <div className="anime-item__play-btn">
              Cмотреть онлайн
              <img src={playBtn} alt="play icon" />
            </div>
            <div className="anime-item__adv-btn">
              Добавить в закладки
              <img
                src={isMobile ? mobileAddFavIcon : addFavIcon}
                alt="add to favourites btn"
              />
            </div>
            <div className="anime-item__adv-btn">
              Написать отзыв
              <img
                src={isMobile ? mobileRateIcon : rateIcon}
                alt="write rate"
              />
            </div>
          </div>
        </div>
        <div className="anime-item__column">
          <h2 className="anime-item__title">{title}</h2>

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
