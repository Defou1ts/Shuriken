import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalogAnimeByOptions } from '../../../slices/catalogSlice';
import { LOADING } from '../../../utils/consts';

import Spinner from '../../common/spinner/Spinner';
import CatalogListItem from '../catalogListItem/CatalogListItem';
import CatalogNotFound from '../catalogNotFound/CatalogNotFound';

import './catalogList.scss';

const CatalogList = () => {
	const dispatch = useDispatch();

	const catalogAnime = useSelector((state) => state.catalog.catalogAnime);
	const catalogAnimeLoadingStatus = useSelector((state) => state.catalog.catalogAnimeLoadingStatus);
	const options = useSelector((state) => state.catalog.options);
	const search = useSelector((state) => state.catalog.search);

	useEffect(() => {
		if (search.length === 0) {
			const fetchOptions = {
				...options,
				type: options.type.join(','),
				status: options.status.join(','),
				ageRating: options.ageRating.join(','),
			};
			dispatch(fetchCatalogAnimeByOptions(fetchOptions));
		}
	}, [dispatch, options, search]);

	const renderAnimes = (animes) => {
		return animes.map((anime) => <CatalogListItem key={anime.id} {...anime} />);
	};

	if (catalogAnimeLoadingStatus === LOADING) {
		return <Spinner small />;
	}

	const renderedAnimes = renderAnimes(catalogAnime);

	const listContent = renderedAnimes.length > 0 ? renderedAnimes : <CatalogNotFound />;

	return <div className="catalog__list">{listContent}</div>;
};
export default CatalogList;
