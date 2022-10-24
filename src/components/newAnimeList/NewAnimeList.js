import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
   fetchNewAnimeByOptionsCreatedAt,
   fetchNewAnimeByOptionsShikimori,
} from "../../slices/newAnimeSlice";
import { v4 as uuidv4 } from "uuid";

import "./newAnimeList.scss";

import NewAnimeItem from "../newAnimeItem/NewAnimeItem";
import Spinner from "../spinner/Spinner";

const NewAnimeList = ({ title, sort }) => {
   const dispatch = useDispatch();

   const shikimoriAnime = useSelector((state) => state.newAnime.shikimoriAnime);
   const createdAtAnime = useSelector((state) => state.newAnime.createdAtAnime);

   const shikimoriAnimeLoadingStatus = useSelector(
      (state) => state.newAnime.shikimoriAnimeLoadingStatus
   );
   const createdAtAnimeLoadingStatus = useSelector(
      (state) => state.newAnime.createdAtAnimeLoadingStatus
   );

   const options = {
      genres: "",
      type: "tv",
      voice: "610",
      status: "ongoing",
      ageRating: "",
      sort,
      limit: 7,
   };

   useEffect(() => {
      switch (sort) {
         case "created_at":
            dispatch(fetchNewAnimeByOptionsCreatedAt(options));
            break;
         case "shikimori_rating":
            dispatch(fetchNewAnimeByOptionsShikimori(options));
            break;
         default:
            break;
      }
   }, []);

   if (
      shikimoriAnimeLoadingStatus === "loading" ||
      createdAtAnimeLoadingStatus === "loading"
   ) {
      return <Spinner />;
   }
   if (
      shikimoriAnimeLoadingStatus === "error" ||
      createdAtAnimeLoadingStatus === "error"
   ) {
      return <p>Ошибка загрузки</p>;
   }

   const renderAnime = (arr) =>
      arr.map(({ ...props }, index) => (
         <NewAnimeItem
            key={uuidv4()}
            {...props}
            index={index}
            reverse={sort === "created_at" ? true : false}
         />
      ));

   const renderedAnime =
      sort === "created_at"
         ? renderAnime(createdAtAnime)
         : renderAnime(shikimoriAnime);

   return (
      <div className="new-anime">
         <div className="new-anime__header">
            <h2 className="new-anime__title title">{title}</h2>
            <div className="line"></div>
         </div>
         <div className="new-anime__grid">{renderedAnime}</div>
      </div>
   );
};

export default NewAnimeList;
