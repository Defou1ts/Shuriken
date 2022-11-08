import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSimilarAnime } from '../../slices/animeSlice';
import { v4 as uuidv4 } from 'uuid';

import './similarAnimes.scss';

import SimilarAnimeItem from '../similarAnimeItem/SimilarAnimeItem';
import Spinner from '../spinner/Spinner';

const SimilarAnimes = () => {
    const dispatch = useDispatch();
    const title = useSelector(state => state.anime.currentAnime.title);
    const similarAnimeList = useSelector(state => state.anime.similarAnimeList);
    const similarAnimeLoadingStatus = useSelector(
        state => state.anime.similarAnimeLoadingStatus
    );

    useEffect(() => {
        if (title) {
            dispatch(fetchSimilarAnime(title));
        }
    }, [title, dispatch]);

    if (similarAnimeLoadingStatus === 'loading') {
        return <Spinner small />;
    }

    if (similarAnimeLoadingStatus === 'error') {
        return <p>Ошибка</p>;
    }

    const renderSimilarAnime = arr => {
        return arr.map(({ title, id }) => (
            <SimilarAnimeItem
                key={uuidv4()}
                title={title}
                id={id}
            />
        ));
    };

    const renderedSimilarAnime = renderSimilarAnime(similarAnimeList);

    return (
        <div className='similar-anime'>
            <div className='similar-anime__title'>Связанное аниме</div>
            <ul className='similar-anime__list'>{renderedSimilarAnime}</ul>
        </div>
    );
};

export default SimilarAnimes;
