import { Link } from 'react-router-dom';

const NewAnimeItem = ({ title, id, index, poster }) => {
   return (
      <Link
         to={`/anime/${id}`}
         class={`new-anime__item-${index} new-anime__item`}>
         <div className="new-anime__descr">
            {title}
         </div>
         <img
            className='new-anime__poster'
            src={poster}
            alt={`Anime image with title: ${title}`} />
      </Link>
   )
}

export default NewAnimeItem;