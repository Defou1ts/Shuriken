import React from 'react';
import { useState } from 'react';

import './searchInput.scss';
import icon from '../../../assets/searchicon.svg';

const SearchInput = ({ fullwidth }) => {
	const [value, setValue] = useState('');
	const className = fullwidth ? 'fullwidth' : '';

	return (
		<div className={`search-input ${className}`}>
			<img src={icon} alt="search" className="search-input__icon" />
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Поиск..."
				required
				type="text"
				className="search-input__field"
			/>
		</div>
	);
};

export default SearchInput;
