import Slider from '../components/slider/Slider';
import NewAnimeList from '../components/newAnimeList/NewAnimeList';

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
