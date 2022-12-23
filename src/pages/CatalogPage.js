import { Helmet } from 'react-helmet';

import Catalog from '../components/catalogPage/catalog/Catalog';
import CatalogSidebar from '../components/catalogPage/catalogSidebar/CatalogSidebar';

const CatalogPage = () => {
	return (
		<div className="container">
			<div className="catalog">
				<Helmet>
					<title>丂huriken | Каталог аниме</title>
					<meta name="description" content="Каталог всех аниме-сериалов для поиска и просмотра онлайн" />
				</Helmet>
				<CatalogSidebar />
				<Catalog />
			</div>
		</div>
	);
};
export default CatalogPage;
