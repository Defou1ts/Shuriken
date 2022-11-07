import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';

const initialState = {
    shikimoriAnime: [],
    shikimoriAnimeLoadingStatus: 'idle',
    createdAtAnime: [],
    createdAtAnimeLoadingStatus: 'idle',
};

export const fetchNewAnimeByOptionsShikimori = createAsyncThunk(
    'newAnime/fetchNewAnimeByOptionsShikimori',
    options => {
        const { getNewAnimeByOptions } = useKodikService();
        return getNewAnimeByOptions(options);
    }
);

export const fetchNewAnimeByOptionsCreatedAt = createAsyncThunk(
    'newAnime/fetchNewAnimeByOptionsCreatedAt',
    options => {
        const { getNewAnimeByOptions } = useKodikService();
        return getNewAnimeByOptions(options);
    }
);

const newAnimeSlice = createSlice({
    name: 'newAnime',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNewAnimeByOptionsShikimori.pending, state => {
            state.shikimoriAnimeLoadingStatus = 'loading';
        });
        builder.addCase(
            fetchNewAnimeByOptionsShikimori.fulfilled,
            (state, action) => {
                state.shikimoriAnime = action.payload;
                state.shikimoriAnimeLoadingStatus = 'idle';
            }
        );
        builder.addCase(fetchNewAnimeByOptionsShikimori.rejected, state => {
            state.shikimoriAnimeLoadingStatus = 'error';
        });

        builder.addCase(fetchNewAnimeByOptionsCreatedAt.pending, state => {
            state.createdAtAnimeLoadingStatus = 'loading';
        });
        builder.addCase(
            fetchNewAnimeByOptionsCreatedAt.fulfilled,
            (state, action) => {
                state.createdAtAnime = action.payload;
                state.createdAtAnimeLoadingStatus = 'idle';
            }
        );
        builder.addCase(fetchNewAnimeByOptionsCreatedAt.rejected, state => {
            state.createdAtAnimeLoadingStatus = 'error';
        });
        builder.addDefaultCase(() => {});
    },
});

export default newAnimeSlice.reducer;
