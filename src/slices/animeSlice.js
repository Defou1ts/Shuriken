import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';

const initialState = {
    currentAnime: {},
    animeLoadingStatus: 'idle',
    similarAnimeList: [],
    similarAnimeLoadingStatus: 'idle',
    selectedTranslation: 610,
    voiceTranslations: [],
    voiceTranslationsLoadingStatus: 'idle',
    reviews: null,
    reviewsLoadingStatus: 'idle',
};

export const fetchTranslations = createAsyncThunk(
    'anime/fetchTranslations',
    (id) => {
        const { getTranslationsListById } = useKodikService();
        return getTranslationsListById(id);
    }
);

export const fetchAnime = createAsyncThunk('anime/fetchAnime', (options) => {
    const { getCurrentAnimeById } = useKodikService();
    return getCurrentAnimeById(options);
});

export const fetchSimilarAnime = createAsyncThunk(
    'anime/fetchSimilarAnime',
    (title) => {
        const { searchAnimeByTitle } = useKodikService();
        return searchAnimeByTitle(title);
    }
);

export const fetchReviews = createAsyncThunk('anime/fetchReviews', (id) => {
    const { findReviewsByAnime } = useKodikService();
    return findReviewsByAnime(id);
});

const animeSlice = createSlice({
    name: 'anime',
    initialState,
    reducers: {
        setSelectedTranslation: (state, action) => {
            state.selectedTranslation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAnime.pending, (state) => {
            state.animeLoadingStatus = 'loading';
        });
        builder.addCase(fetchAnime.fulfilled, (state, action) => {
            state.animeLoadingStatus = 'idle';
            state.currentAnime = action.payload;
        });
        builder.addCase(fetchAnime.rejected, (state) => {
            state.animeLoadingStatus = 'error';
        });
        builder.addCase(fetchSimilarAnime.pending, (state) => {
            state.similarAnimeLoadingStatus = 'loading';
        });
        builder.addCase(fetchSimilarAnime.fulfilled, (state, action) => {
            state.similarAnimeLoadingStatus = 'idle';
            state.similarAnimeList = action.payload;
        });
        builder.addCase(fetchSimilarAnime.rejected, (state) => {
            state.similarAnimeLoadingStatus = 'error';
        });
        builder.addCase(fetchTranslations.pending, (state) => {
            state.voiceTranslationsLoadingStatus = 'loading';
        });
        builder.addCase(fetchTranslations.fulfilled, (state, action) => {
            state.voiceTranslations = 'idle';
            state.voiceTranslations = action.payload;
        });
        builder.addCase(fetchTranslations.rejected, (state) => {
            state.voiceTranslationsLoadingStatus = 'error';
        });
        builder.addCase(fetchReviews.pending, (state) => {
            state.reviewsLoadingStatus = 'loading';
        });
        builder.addCase(fetchReviews.fulfilled, (state, action) => {
            state.reviewsLoadingStatus = 'idle';
            state.reviews = action.payload;
        });
        builder.addCase(fetchReviews.rejected, (state, action) => {
            console.log(action);
            state.reviewsLoadingStatus = 'error';
        });
    },
});

export const { setSelectedTranslation } = animeSlice.actions;

export default animeSlice.reducer;
