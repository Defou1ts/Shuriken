import SearchInput from '../../common/searchInput/SearchInput';
import CatalogList from '../catalogList/CatalogList';

import './catalog.scss';

const Catalog = () => {
	return (
		<div className="catalog__content">
			<h1 className="catalog__title">Каталог аниме</h1>
			<SearchInput fullwidth />
			<CatalogList />
		</div>
	);
};
export default Catalog;
