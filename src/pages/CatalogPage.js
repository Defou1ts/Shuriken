import Catalog from '../components/catalogPage/catalog/Catalog';
import CatalogSidebar from '../components/catalogPage/catalogSidebar/CatalogSidebar';

const CatalogPage = () => {
	return (
		<div className="container">
			<div className="catalog">
				<CatalogSidebar />
				<Catalog />
			</div>
		</div>
	);
};
export default CatalogPage;
