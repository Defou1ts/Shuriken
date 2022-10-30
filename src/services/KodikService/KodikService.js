import { useHttp } from '../../hooks/http.hook';

const useKodikService = () => {
  const { request } = useHttp();

  const _apiBase = 'https://kodikapi.com/';
  const _apiToken = '2d343183c2f3cfb3c557e409460875e2';
  const newEpisodesLimit = 4;

  const getSliderItems = async (sliderItemsLimit = 3) => {
    const res = await request(
      `${_apiBase}list?token=${_apiToken}&limit=${sliderItemsLimit}&sort=shikimori_rating&year=2022&translation_id=610&types=anime-serial`
    );
    return await res.results.map(_transformSliderItems);
  };

  const getNewEpisodes = async () => {
    const res = await request(
      `${_apiBase}list?token=${_apiToken}&limit=${newEpisodesLimit}&camrip=false&translation_type=voice&types=anime-serial&with_material_data=true`
    );
    return await res.results.map(_transformNewEpisodes);
  };

  const getGenres = async () => {
    const res = await request(
      `${_apiBase}genres?token=${_apiToken}&genres_type=all&types=anime-serial&translation_id=610&sort=count&all_status`
    );
    return await res.results;
  };

  const getAnnounces = async () => {
    const res = await request(
      `${_apiBase}list?token=${_apiToken}&types=anime-serial&anime_status=anons&sort=shikimori_rating&with_material_data=true`
    );
    return await res.results.map(_transformNewAnimes);
  };

  const getNewAnimeByOptions = async ({
    genres,
    type,
    voice,
    status,
    ageRating,
    sort,
    limit,
  }) => {
    const res = await request(
      `${_apiBase}list?token=${_apiToken}&sort=${sort}&camrip=false&types=anime-serial&with_material_data=true&limit=${limit}&translation_type=voice&genres=${genres}&anime_kind=${type}&translation_id=${
        voice.length > 0 ? voice : 610
      }&anime_status=${status}&mpaa_rating=${ageRating}`
    );
    return await res.results.map(_transformNewAnimes);
  };

  const getVoiceTranslations = async () => {
    const res = await request(
      `${_apiBase}translations/v2?token=${_apiToken}&types=anime-serial&translation_type=voice&sort=count`
    );
    return res.results;
  };

  const getAnimeById = async (id) => {
    const res = await request(
      `${_apiBase}search?token=${_apiToken}&shikimori_id=${id}&with_material_data=true`
    );
    return _transformAnime(res.results[0]);
  };

  const _transformAnime = (anime) => {
    return {
      title: anime.title,
      poster: anime.material_data.poster_url,
      description: anime.material_data.anime_description,
      screenshots: anime.screenshots,
      rating: anime.material_data.shikimori_rating,
      kind: anime.material_data.anime_kind,
      episodesAired: anime.material_data.episodes_aired,
      episodesTotal: anime.material_data.episodes_total,
      status: anime.material_data.anime_status,
      genres: anime.material_data.anime_genres,
      year: anime.material_data.year,
      createdAt: anime.created_at,
      studios: anime.material_data.anime_studios,
      mpaa: anime.material_data.rating_mpaa,
      duration: anime.material_data.duration,
    };
  };

  const _transformSliderItems = (item) => {
    return {
      title: item.material_data.title,
      poster: item.material_data.screenshots[1],
      id: item.shikimori_id,
    };
  };

  const _transformNewEpisodes = (anime) => {
    return {
      title: anime.material_data ? anime.material_data.title : anime.title,
      titleEn: anime.material_data
        ? anime.material_data.title_en
        : anime.title_orig,
      poster: anime.material_data
        ? anime.material_data.poster_url
        : anime.screenshots[0],
      lastEpisode: anime.last_episode,
      id: anime.shikimori_id,
    };
  };

  const _transformNewAnimes = (anime) => {
    return {
      title:
        anime.material_data.title.length > 13
          ? anime.material_data.title.slice(0, 13) + '...'
          : anime.material_data.title,
      titleEn: anime.material_data.title_en,
      poster: anime.material_data.poster_url,
      id: anime.shikimori_id,
      genres: anime.material_data.anime_genres,
      year: anime.year,
      kind: anime.material_data.anime_kind,
    };
  };

  return {
    getAnimeById,
    getSliderItems,
    getNewEpisodes,
    getGenres,
    getVoiceTranslations,
    getNewAnimeByOptions,
    getAnnounces,
  };
};

export default useKodikService;
