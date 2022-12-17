import { useSelector, useDispatch } from 'react-redux/es/exports';
import { setSort, setIsActiveSortMenu } from '../../../slices/catalogSlice';
import { v4 } from 'uuid';

import Dropdown from 'react-dropdown';

import arrowIcon from '../../../assets/arrow.svg';

import './catalogSort.scss';

const CatalogSort = () => {
	const dispatch = useDispatch();

	const isActiveSortMenu = useSelector((state) => state.catalog.isActiveSortMenu);
	const sortsTypes = useSelector((state) => state.catalog.sortsTypes);
	const activeSort = useSelector((state) => state.catalog.options.sort);
	const isMobile = useSelector((state) => state.global.isMobile);

	const renderSorts = (sortsTypes) => {
		return sortsTypes.map(({ label, value }) => {
			return {
				label,
				value,
			};
		});
	};

	const onChange = (e) => {
		const { value } = e.target.dataset;
		dispatch(setSort(value));
	};

	const renderSelectSorts = (sortsTypes) => {
		return sortsTypes.map(({ label, value }) => {
			let className = 'catalog__sort-mobile-item';
			if (activeSort === value) className += ' active';
			return (
				<li key={v4()} onClick={(e) => onChange(e)} className={className} data-value={value}>
					{label}
				</li>
			);
		});
	};

	const renderedSortsTypes = isMobile ? renderSelectSorts(sortsTypes) : renderSorts(sortsTypes);
	const arrowImage = <img src={arrowIcon} alt="arrow" />;
	const mobileMenuActiveClass = isActiveSortMenu ? 'active' : '';

	return (
		<>
			{!isMobile && (
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
			)}

			{isMobile && (
				<div className={`catalog__sort-mobile ${mobileMenuActiveClass}`}>
					<div className="catalog__sort-mobile-header">
						<h2 className="catalog__sort-mobile-title">Сортировка</h2>
						<div
							className="catalog__sort-mobile-close"
							onClick={() => dispatch(setIsActiveSortMenu(false))}
						></div>
					</div>
					<ul className="catalog__sort-mobile-list">{renderedSortsTypes}</ul>
				</div>
			)}
		</>
	);
};
export default CatalogSort;
