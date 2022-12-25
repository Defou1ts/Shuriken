import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useKodikService from '../services/KodikService/KodikService';
import { IDLE, LOADING, ERROR } from '../utils/consts';

const initialState = {
	sliderItems: [],
	sliderItemsLoadingStatus: IDLE,
};

export const fetchSliderItems = createAsyncThunk('sliderItems/fetchSliderItems', (count) => {
	const { getSliderItems } = useKodikService();
	return getSliderItems(count);
});

const sliderSlice = createSlice({
	name: 'sliderItems',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchSliderItems.pending, (state) => {
			state.sliderItemsLoadingStatus = LOADING;
		});
		builder.addCase(fetchSliderItems.fulfilled, (state, action) => {
			state.sliderItemsLoadingStatus = IDLE;
			state.sliderItems = action.payload;
		});
		builder.addCase(fetchSliderItems.rejected, (state) => {
			state.sliderItemsLoadingStatus = ERROR;
		});
		builder.addDefaultCase(() => {});
	},
});

export default sliderSlice.reducer;
