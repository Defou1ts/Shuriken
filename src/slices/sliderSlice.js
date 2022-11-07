import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';

const initialState = {
    sliderItems: [],
    sliderItemsLoadingStatus: 'idle',
};

export const fetchSliderItems = createAsyncThunk(
    'sliderItems/fetchSliderItems',
    count => {
        const { getSliderItems } = useKodikService();
        return getSliderItems(count);
    }
);

const sliderSlice = createSlice({
    name: 'sliderItems',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchSliderItems.pending, state => {
            state.sliderItemsLoadingStatus = 'loading';
        });
        builder.addCase(fetchSliderItems.fulfilled, (state, action) => {
            state.sliderItemsLoadingStatus = 'idle';
            state.sliderItems = action.payload;
        });
        builder.addCase(fetchSliderItems.rejected, state => {
            state.sliderItemsLoadingStatus = 'error';
        });
        builder.addDefaultCase(() => {});
    },
});

export default sliderSlice.reducer;
