import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setSort } from '../../../slices/catalogSlice';

import Dropdown from 'react-dropdown';

import arrowIcon from '../../../assets/arrow.svg';

import './catalogSort.scss';

const CatalogSort = () => {
	const dispatch = useDispatch();

	const sortsTypes = useSelector((state) => state.catalog.sortsTypes);
	const activeSort = useSelector((state) => state.catalog.options.sort);

	const renderSorts = (sortsTypes) => {
		return sortsTypes.map(({ label, value }) => {
			return {
				label,
				value,
			};
		});
	};

	const renderedSortsTypes = renderSorts(sortsTypes);
	const arrowImage = <img src={arrowIcon} alt="arrow" />;

	return (
		<Dropdown
			onChange={(e) => dispatch(setSort(e.value))}
			value={activeSort}
			placeholder="Select an option"
			options={renderedSortsTypes}
			className="catalog__sort"
			controlClassName="catalog__sort-control"
			placeholderClassName="catalog__sort-placeholder"
			menuClassName="catalog__sort-menu"
			arrowClassName="catalog__sort-arrow"
			arrowClosed={arrowImage}
			arrowOpen={arrowImage}
		/>
	);
};
export default CatalogSort;
