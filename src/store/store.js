import { configureStore, } from "@reduxjs/toolkit";
import slider from "../slices/sliderSlice";
import newEpisodes from "../slices/newEpisodesSlice";
import newAnime from "../slices/newAnimeSlice";
import genres from "../slices/genresSlice";
import voiceTranslations from "../slices/voiceTranslationsSlice";
import global from "../slices/globalSlice";

const store = configureStore({
   reducer: { global, slider, newEpisodes, newAnime, genres, voiceTranslations },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
   devTools: process.env.NODE_ENV !== 'production',
})

export default store;