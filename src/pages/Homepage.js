import { Helmet } from 'react-helmet';

import Slider from '../components/homePage/slider/Slider';
import NewAnimeList from '../components/homePage/newAnimeList/NewAnimeList';

const Homepage = () => {
	return (
		<>
			<Helmet>
				<meta name="description" content="Аниме портал для онлайн просмотра аниме. Главная страница" />
				<title>丂huriken</title>
			</Helmet>
			<Slider />
			<div className="container">
				<NewAnimeList title="Аниме" sort="shikimori_rating" />
				<NewAnimeList title="Скоро на сайте" sort="created_at" />
			</div>
		</>
	);
};

export default Homepage;
