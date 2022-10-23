import { Link } from 'react-router-dom';

const SliderSlide = ({ title, poster, id }) => {
   return (
      <div className="slider__slide">
         <img
            className='slider__image'
            src={poster}
            alt={title} />
         <div className="slider__info">
            <div className="slider__title">{title}</div>
            <Link
               to={`/anime/${id}`}
               className="slider__button">
               Смотреть сейчас
            </Link>
         </div>
      </div>
   )
}

export default SliderSlide;