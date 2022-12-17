import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SliderSlide = ({ title, poster, id, year, kind }) => {
	const isMobile = useSelector((state) => state.global.isMobile);

	const renderedKind = kind.toUpperCase();

	return (
		<div className="slider__slide">
			<img className="slider__image" src={poster} alt={title} />
			<div className="slider__info">
				<div className="slider__adv-info">
					<div className="slider__year">{year}</div>
					<div className="slider__kind">{renderedKind}</div>
				</div>
				{/* <div className="slider__title">{title}</div> */}
				<Link to={`/anime/${id}`} className="slider__title">
					{title}
				</Link>
				{isMobile && (
					<Link to={`/anime/${id}`} className="slider__button">
						Смотреть сейчас
					</Link>
				)}
			</div>
		</div>
	);
};

export default SliderSlide;
