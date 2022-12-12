import SearchInput from '../../common/searchInput/SearchInput';
import CatalogList from '../catalogList/CatalogList';
import CatalogSort from '../catalogSort/CatalogSort';

import './catalog.scss';

const Catalog = () => {
	return (
		<div className="catalog__content">
			<h1 className="catalog__title">Каталог аниме</h1>
			<div className="catalog__search-params">
				<SearchInput fullwidth />
				<CatalogSort />
			</div>
			<CatalogList />
		</div>
	);
};
export default Catalog;
