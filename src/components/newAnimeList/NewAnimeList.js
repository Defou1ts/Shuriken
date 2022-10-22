import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewAnimeByOptions } from '../../slices/newAnimeSlice';
import { v4 as uuidv4 } from 'uuid';

import './newAnimeList.scss';

import NewAnimeItem from '../newAnimeItem/NewAnimeItem';
import Spinner from '../spinner/Spinner';

const NewAnimeList = () => {

   const dispatch = useDispatch();

   const newAnimeList = useSelector(state => state.newAnime.newAnime);
   const newAnimeLoadingStatus = useSelector(state => state.newAnime.newAnimeLoadingStatus);

   const options = {
      genres: '',
      type: 'tv',
      voice: '610',
      status: 'ongoing',
      ageRating: '',
      limit: 7,
   }

   useEffect(() => {
      dispatch(fetchNewAnimeByOptions(options))
   }, [])


   if (newAnimeLoadingStatus === 'loading') {
      return (
         <Spinner />
      )
   }
   if (newAnimeLoadingStatus === 'error') {
      return <p>Ошибка загрузки</p>
   }

   const renderedNewAnime = newAnimeList.map(({ ...props }, index) =>
      (<NewAnimeItem key={uuidv4()} {...props} index={index} />)
   )

   return (
      <div className="new-anime">
         <div className="new-anime__header">
            <h2 className="new-anime__title title">
               Аниме
            </h2>
            <div className="line"></div>
         </div>
         <div className="new-anime__grid">
            {renderedNewAnime}
         </div>
      </div>
   )
}

export default NewAnimeList;