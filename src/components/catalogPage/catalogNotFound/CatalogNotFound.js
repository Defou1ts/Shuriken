import './catalogNotFound.scss';

import notFoundIcon from '../../../assets/notfound.svg';

const CatalogNotFound = () => {
	return (
		<div className="catalog__not-found">
			<p className="catalog__not-found-text">Простите, мы ничего не нашли!</p>
			<p className="catalog__not-found-text">Напишите корректнее или, возможно, этого аниме нет еще на сайте.</p>
			<img className='catalog__not-found-image' src={notFoundIcon} alt="Ничего не найдено" />
		</div>
	);
};
export default CatalogNotFound;
