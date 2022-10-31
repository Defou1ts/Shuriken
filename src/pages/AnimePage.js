import AnimeItem from '../components/animeItem/AnimeItem';
import SimilarAnimes from '../components/similarAnimes/SimilarAnimes';
import AnimePlayer from '../components/animePlayer/AnimePlayer';

const AnimePage = () => {
  return (
    <div className="anime">
      <div className="container">
        <AnimeItem />
        <SimilarAnimes />
        <AnimePlayer />
      </div>
    </div>
  );
};

export default AnimePage;
