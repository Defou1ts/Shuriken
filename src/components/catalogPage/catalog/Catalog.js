import { useSelector } from 'react-redux';

import SearchInput from '../../common/searchInput/SearchInput';
import CatalogList from '../catalogList/CatalogList';
import CatalogSort from '../catalogSort/CatalogSort';
import CatalogMobileMenu from '../catalogMobileMenu/CatalogMobileMenu';

import './catalog.scss';

const Catalog = () => {
	const isMobile = useSelector((state) => state.global.isMobile);

	return (
		<div className="catalog__content">
			{!isMobile && <h1 className="catalog__title">Каталог аниме</h1>}
			<div className="catalog__search-params">
				{!isMobile && <SearchInput fullwidth />}
				<CatalogSort />
			</div>
			<CatalogList />
			{isMobile && <CatalogMobileMenu />}
		</div>
	);
};
export default Catalog;
