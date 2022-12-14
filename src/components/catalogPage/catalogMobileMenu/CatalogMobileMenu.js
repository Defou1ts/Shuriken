import { useDispatch } from 'react-redux';
import { setIsActiveFiltersMenu, setIsActiveSortMenu } from '../../../slices/catalogSlice';

import './catalogMobileMenu.scss';
const CatalogMobileMenu = () => {
	const dispatch = useDispatch();

	return (
		<div className="catalog__mobile-menu">
			<button className="catalog__mobile-menu-btn" onClick={() => dispatch(setIsActiveFiltersMenu(true))}>
				Фильтры
			</button>
			<button className="catalog__mobile-menu-btn" onClick={() => dispatch(setIsActiveSortMenu(true))}>
				Сортировка
			</button>
		</div>
	);
};
export default CatalogMobileMenu;
