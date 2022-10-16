import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useKodikService from "../services/KodikService/KodikService";

const initialState = {
   newAnime: [],
   newAnimeLoadingStatus: 'idle',
}

export const fetchNewAnimeByOptions = createAsyncThunk(
   'newAnime/fetchNewAnimeByOptions',
   (data) => {
      const { getNewAnimeByOptions } = useKodikService()
      return getNewAnimeByOptions(data)
   }
)


const newAnimeSlice = createSlice({
   name: 'newAnime',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchNewAnimeByOptions.pending, state => { state.newAnimeLoadingStatus = 'loading' })
      builder.addCase(fetchNewAnimeByOptions.fulfilled, (state, action) => {
         state.newAnime = action.payload;
         state.newAnimeLoadingStatus = 'idle';
      })
      builder.addCase(fetchNewAnimeByOptions.rejected, (state) => { state.newAnimeLoadingStatus = 'error' })
      builder.addDefaultCase(() => { })
   }
})

export default newAnimeSlice.reducer;