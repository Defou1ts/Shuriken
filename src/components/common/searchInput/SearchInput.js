import React from 'react';
import { useState, useEffect } from 'react';
import { fetchSearchAnimeByTitle, setSearch } from '../../../slices/catalogSlice';
import { useDispatch } from 'react-redux';
import { CATALOG_ROUTE } from '../../../utils/consts';
import { useNavigate } from 'react-router-dom';

import './searchInput.scss';
import icon from '../../../assets/searchicon.svg';

const SearchInput = ({ fullwidth }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [searchText, setSearchText] = useState('');

	const handleOnChange = (value) => {
		setSearchText(value);
		dispatch(setSearch(value));
		if (value.length) {
			dispatch(fetchSearchAnimeByTitle(value));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchText(searchText);	
		dispatch(fetchSearchAnimeByTitle(searchText));
		navigate(CATALOG_ROUTE);
	};

	const className = fullwidth ? 'fullwidth' : '';

	return (
		<form onSubmit={(e) => handleSubmit(e)} className={`search-input ${className}`}>
			<img src={icon} alt="search" className="search-input__icon" />
			<input
				value={searchText}
				onChange={(e) => handleOnChange(e.target.value)}
				placeholder="Поиск..."
				required
				type="text"
				className="search-input__field"
			/>
		</form>
	);
};

export default SearchInput;
