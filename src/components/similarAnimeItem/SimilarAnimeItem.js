import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SimilarAnimeItem = ({ title, id: index }) => {
  const id = useSelector((state) => state.anime.anime.id);
  const isCurrent = id === index;

  return (
    <li>
      <Link
        className={`similar-anime__link ${isCurrent ? 'disabled' : ''}`}
        to={`/anime/${index}`}
      >
        {title}
        {isCurrent ? '(текущее)' : null}
      </Link>
    </li>
  );
};

export default SimilarAnimeItem;
