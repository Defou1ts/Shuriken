import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useKodikService from "../services/KodikService/KodikService";

const initialState = {
   newEpisodes: [],
   newEpisodesLoadingStatus: 'idle',
}

export const fetchNewEpisodes = createAsyncThunk(
   'newEpisodes/fetchNewEpisodes',
   () => {
      const { getNewEpisodes } = useKodikService()
      return getNewEpisodes()
   }
)


const newEpisodesSlice = createSlice({
   name: 'newEpisodes',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchNewEpisodes.pending, state => { state.newEpisodesLoadingStatus = 'loading' })
      builder.addCase(fetchNewEpisodes.fulfilled, (state, action) => {
         state.newEpisodes = action.payload;
         state.newEpisodesLoadingStatus = 'idle';
      })
      builder.addCase(fetchNewEpisodes.rejected, (state) => { state.newEpisodesLoadingStatus = 'error' })
      builder.addDefaultCase(() => { })
   }
})

export default newEpisodesSlice.reducer;