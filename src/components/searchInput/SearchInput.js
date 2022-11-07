import React from 'react';
import { useState } from 'react';

import './searchInput.scss';
import icon from '../../assets/searchicon.svg';

const SearchInput = () => {
    const [value, setValue] = useState('');

    return (
        <div className='search-input'>
            <img
                src={icon}
                alt='search'
                className='search-input__icon'
            />
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder='Поиск...'
                required
                type='text'
                className='search-input__field'
            />
        </div>
    );
};

export default SearchInput;
