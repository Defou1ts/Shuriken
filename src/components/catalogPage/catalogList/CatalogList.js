import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogAnimeByOptions } from '../../../slices/catalogSlice';
import { LOADING } from '../../../utils/consts';

import Spinner from '../../common/spinner/Spinner';
import CatalogListItem from '../catalogListItem/CatalogListItem';

import './catalogList.scss';

const CatalogList = () => {
    const dispatch = useDispatch();

    const [genres, setGenres] = useState([]);
    const [type, setType] = useState('tv');
    const [statuses, setStatuses] = useState(['ongoing']);
    const [ageRating, setAgeRating] = useState(['']);

    const catalogAnime = useSelector((state) => state.catalog.catalogAnime);
    const catalogAnimeLoadingStatus = useSelector((state) => state.catalog.catalogAnimeLoadingStatus);

    const options = useMemo(
        () => ({
            genres: genres.join(','),
            type: 'tv',
            voice: '610',
            status: statuses.join(','),
            ageRating: '',
            sort: 'shikimori_rating',
            limit: 10,
        }),
        [genres, type, statuses, ageRating]
    );

    useEffect(() => {
        dispatch(fetchCatalogAnimeByOptions(options));
    }, [dispatch, options]);

    const renderAnimes = (animes) => {
        return animes.map((anime) => <CatalogListItem key={anime.id} {...anime} />);
    };

    if (catalogAnimeLoadingStatus === LOADING) {
        return <Spinner small />;
    }

    const renderedAnimes = renderAnimes(catalogAnime);

    return <div className="catalog__list">{renderedAnimes}</div>;
};
export default CatalogList;
