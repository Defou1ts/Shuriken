import {
	setGenres,
	addType,
	removeType,
	addAgeRating,
	removeAgeRating,
	setIsActiveFiltersMenu,
} from '../../../slices/catalogSlice';
import { useSelector, useDispatch } from 'react-redux';
import { LOADING } from '../../../utils/consts';
import { fetchGenres } from '../../../slices/genresSlice';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import MultiSelect from 'react-multiple-select-dropdown-lite';
import Spinner from '../../common/spinner/Spinner';

import 'react-multiple-select-dropdown-lite/dist/index.css';
import './catalogSidebar.scss';

const CatalogSidebar = () => {
	const dispatch = useDispatch();

	const genres = useSelector((state) => state.genres.genres);
	const genresLoadingStatus = useSelector((state) => state.genres.genresLoadingStatus);
	const ageRatingsTypes = useSelector((state) => state.catalog.ageRatings);
	const ageRating = useSelector((state) => state.catalog.options.ageRating);
	const typesTypes = useSelector((state) => state.catalog.types);
	const types = useSelector((state) => state.catalog.options.type);
	const isActiveFiltersMenu = useSelector((state) => state.catalog.isActiveFiltersMenu);
	const isMobile = useSelector((state) => state.global.isMobile);

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);

	// eslint-disable-next-line
	const [value, setValue] = useState('');

	const onChangeGenre = (val) => {
		setValue(val);
		dispatch(setGenres(val));
	};

	const renderGenres = (genres) => {
		return genres.map((genre) => {
			return {
				label: genre.title,
				value: genre.title,
			};
		});
	};

	const renderRatings = (ageRatingsTypes) => {
		return ageRatingsTypes.map((ratingType) => {
			let checked = false;
			let handleActive = addAgeRating;
			for (const rating of ageRating) {
				if (ratingType === rating) {
					checked = true;
					handleActive = removeAgeRating;
				}
			}
			return (
				<div key={uuid()} className="catalog__siderbar-age-item">
					<label className={checked ? 'checked' : ''}>
						<input
							checked={checked}
							type="checkbox"
							value={ratingType}
							onClick={(e) => dispatch(handleActive(e.target.value))}
						/>
					</label>
					{ratingType.toUpperCase()}
				</div>
			);
		});
	};

	const renderTypes = (typesTypes) => {
		return typesTypes.map((typeType) => {
			let checked = false;
			let handleActive = addType;
			for (const type of types) {
				if (typeType.type === type) {
					checked = true;
					handleActive = removeType;
				}
			}
			return (
				<div key={uuid()} className="catalog__siderbar-age-item">
					<label className={checked ? 'checked' : ''}>
						<input
							checked={checked}
							type="checkbox"
							value={typeType.type}
							onClick={(e) => dispatch(handleActive(e.target.value))}
						/>
					</label>
					{typeType.name}
				</div>
			);
		});
	};

	const renderedGenres = renderGenres(genres);
	const renderedRatings = renderRatings(ageRatingsTypes);
	const renderedTypes = renderTypes(typesTypes);
	const activeClass = isActiveFiltersMenu ? 'active' : '';

	if (genresLoadingStatus === LOADING) {
		return <Spinner small />;
	}

	return (
		<div className={`catalog__sidebar ${activeClass}`}>
			{isMobile ? (
				<div className="catalog__sidebar-mobile-header">
					<h3 className="catalog__sidebar-mobile-title">Фильтры</h3>
					<div
						onClick={() => dispatch(setIsActiveFiltersMenu(false))}	
						className="catalog__sidebar-mobile-close"
					></div>
				</div>
			) : null}
			<h3 className="catalog__sidebar-subtitle">Жанры</h3>
			<MultiSelect onChange={onChangeGenre} options={renderedGenres} placeholder={'Выберите жанр'} />
			<h3 className="catalog__sidebar-subtitle">Возрастной рейтинг</h3>
			<div className="catalog__sidebar-age-list">{renderedRatings}</div>
			<h3 className="catalog__sidebar-subtitle">Тип</h3>
			<div className="catalog__sidebar-types-list">{renderedTypes}</div>
		</div>
	);
};
export default CatalogSidebar;
