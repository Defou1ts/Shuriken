import { configureStore } from "@reduxjs/toolkit";
import slider from "../slices/sliderSlice";
import newEpisodes from "../slices/newEpisodesSlice";
import newAnime from "../slices/newAnimeSlice";
import genres from "../slices/genresSlice";
import voiceTranslations from "../slices/voiceTranslationsSlice";

const store = configureStore({
   reducer: { slider, newEpisodes, newAnime, genres, voiceTranslations },
   devTools: process.env.NODE_ENV !== 'production',
})

export default store;