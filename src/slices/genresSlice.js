import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useKodikService from "../services/KodikService/KodikService";

const initialState = {
   genres: [],
   genresLoadingStatus: 'idle'
}

export const fetchGenres = createAsyncThunk(
   'genres/fetchGenres',
   () => {
      const { getGenres } = useKodikService()
      return getGenres()
   }
)

const genresSlice = createSlice({
   name: 'genres',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchGenres.pending, state => { state.genresLoadingStatus = 'loading' })
      builder.addCase(fetchGenres.fulfilled, (state, action) => {
         state.genres = action.payload;
         state.genresLoadingStatus = 'idle';
      })
      builder.addCase(fetchGenres.rejected, state => { state.genresLoadingStatus = 'error' })
      builder.addDefaultCase(() => { })
   }
})

export default genresSlice.reducer;