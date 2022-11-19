import Slider from '../components/homePage/slider/Slider';
import NewAnimeList from '../components/homePage/newAnimeList/NewAnimeList';

const Homepage = () => {
    return (
        <>
            <Slider />
            <div className='container'>
                <NewAnimeList
                    title='Аниме'
                    sort='shikimori_rating'
                />
                <NewAnimeList
                    title='Скоро на сайте'
                    sort='created_at'
                />
            </div>
        </>
    );
};

export default Homepage;
