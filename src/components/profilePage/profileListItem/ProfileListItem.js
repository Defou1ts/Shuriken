import './profileListItem.scss';
import { Link } from 'react-router-dom';

const ProfileListItem = ({ anime, color, text }) => {
    return (
        <Link to={`/anime/${anime.id}`}>
            <div className='profile__list-item'>
                <div className='profile__list-item-image'>
                    <img
                        src={anime.poster}
                        alt={anime.title}
                    />
                    <div
                        style={{ backgroundColor: color }}
                        className='profile__list-item-note'>
                        {text}
                    </div>
                </div>
                <div className='profile__list-item-content'>
                    <p className='profile__list-item-title'>
                        {anime.title} <span>/ {anime.titleEn}</span>
                    </p>
                    <div className='profile__list-item-year'>{anime.year}</div>
                    <div className='profile__list-item-last-episode'>
                        Последняя серия: {anime.episodesAired}
                    </div>
                    {/* <div className='profile__list-item-descr'>
                        {anime.description}
                    </div> */}
                </div>
                <div className='profile__list-item-settings'>. . .</div>
            </div>
        </Link>
    );
};
export default ProfileListItem;
