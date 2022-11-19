import AnimeItem from '../components/animePage/animeItem/AnimeItem';
import SimilarAnimes from '../components/animePage/similarAnimes/SimilarAnimes';
import AnimePlayer from '../components/animePage/animePlayer/AnimePlayer';

const AnimePage = () => {
    return (
        <div className='anime'>
            <div className='container'>
                <AnimeItem />
                <SimilarAnimes />
                <AnimePlayer />
            </div>
        </div>
    );
};

export default AnimePage;
