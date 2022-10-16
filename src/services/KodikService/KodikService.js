import { useHttp } from "../../hooks/http.hook";

const useKodikService = () => {

   const { request } = useHttp()

   const _apiBase = 'https://kodikapi.com/';
   const _apiToken = '2d343183c2f3cfb3c557e409460875e2';
   const newEpisodesLimit = 4;
   const newAnimesLimit = window.innerWidth > 1024 ? 5 : 12;

   const getSliderItems = async (sliderItemsLimit = 3) => {
      const res = await request(`${_apiBase}list?token=${_apiToken}&limit=${sliderItemsLimit}&sort=shikimori_rating&year=2022&translation_id=610&types=anime-serial`)
      return await res.results.map(_transformSliderItems)
   }

   const getNewEpisodes = async () => {
      const res = await request(`${_apiBase}list?token=${_apiToken}&limit=${newEpisodesLimit}&camrip=false&translation_type=voice&types=anime-serial&with_material_data=true`)
      return await res.results.map(_transformNewEpisodes)
   }

   const getGenres = async () => {
      const res = await request(`${_apiBase}genres?token=${_apiToken}&genres_type=all&types=anime-serial&translation_id=610&sort=count&all_status`)
      return await res.results;
   }

   const getNewAnimeByOptions = async ({ genres, type, voice, status, ageRating }) => {
      const res = await request(`${_apiBase}list?token=${_apiToken}&sort=created_at&types=anime-serial&with_material_data=true&limit=${newAnimesLimit}&translation_type=voice&genres=${genres}&anime_kind=${type}&translation_id=${voice.length > 0 ? voice : 610}&anime_status=${status}&mpaa_rating=${ageRating}`)
      return await res.results.map(_transformNewAnimes);
   }

   const getVoiceTranslations = async () => {
      const res = await request(`${_apiBase}translations/v2?token=${_apiToken}&types=anime-serial&translation_type=voice&sort=count`)
      return res.results;
   }

   const _transformSliderItems = (item) => {
      return {
         title: item.material_data.title,
         poster: item.material_data.screenshots[1],
         id: item.shikimori_id,
      }
   }

   const _transformNewEpisodes = (anime) => {
      return {
         title: anime.material_data ? anime.material_data.title : anime.title,
         titleEn: anime.material_data ? anime.material_data.title_en : anime.title_orig,
         poster: anime.material_data ? anime.material_data.poster_url : anime.screenshots[0],
         lastEpisode: anime.last_episode,
         id: anime.shikimori_id,
      }
   }

   const _transformNewAnimes = (anime) => {
      return {
         title: anime.material_data.title,
         titleEn: anime.material_data.title_en,
         poster: anime.material_data.poster_url,
         id: anime.shikimori_id,
         genres: anime.material_data.anime_genres,
         year: anime.year,
         kind: anime.material_data.anime_kind,
      }
   }

   return {
      getSliderItems,
      getNewEpisodes,
      getGenres,
      getVoiceTranslations,
      getNewAnimeByOptions
   }
}

export default useKodikService;