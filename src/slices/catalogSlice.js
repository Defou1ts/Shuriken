import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';
import { ERROR, IDLE, LOADING } from '../utils/consts';

const initialState = {
    catalogAnime: [],
    catalogAnimeLoadingStatus: 'idle',
};

export const fetchCatalogAnimeByOptions = createAsyncThunk('catalog/fetchCatalogAnimeByOptions', (options) => {
    const { getNewAnimeByOptions } = useKodikService();
    return getNewAnimeByOptions(options);
});

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCatalogAnimeByOptions.pending, (state) => {
            state.catalogAnimeLoadingStatus = LOADING;
        });
        builder.addCase(fetchCatalogAnimeByOptions.fulfilled, (state, action) => {
            state.catalogAnime = action.payload;
            state.catalogAnimeLoadingStatus = IDLE;
        });
        builder.addCase(fetchCatalogAnimeByOptions.rejected, (state) => {
            state.catalogAnimeLoadingStatus = ERROR;
        });

        builder.addDefaultCase(() => {});
    },
});

export default catalogSlice.reducer;
