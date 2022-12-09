import AnimeItem from '../components/animePage/animeItem/AnimeItem';
import SimilarAnimes from '../components/animePage/similarAnimes/SimilarAnimes';
import AnimePlayer from '../components/animePage/animePlayer/AnimePlayer';
import AnimeReviews from '../components/animePage/animeReviews/AnimeReviews';

const AnimePage = () => {
	return (
		<div className="anime">
			<div className="container">
				<AnimeItem />
				<SimilarAnimes />
				<AnimePlayer />
				<AnimeReviews />
			</div>
		</div>
	);
};

export default AnimePage;
