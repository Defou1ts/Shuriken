import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useKodikService from "../services/KodikService/KodikService";

const initialState = {
   voiceTranslations: [],
   voiceTranslationsLoadingStatus: 'idle'
}

export const fetchVoiceTranslations = createAsyncThunk(
   'voiceTranslations/fetchVoiceTranslations',
   () => {
      const { getVoiceTranslations } = useKodikService()
      return getVoiceTranslations()
   }
)

const voiceTranslationsSlice = createSlice({
   name: 'voiceTranslations',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchVoiceTranslations.pending, state => { state.voiceTranslationsLoadingStatus = 'loading' })
      builder.addCase(fetchVoiceTranslations.fulfilled, (state, action) => {
         state.voiceTranslations = action.payload;
         state.voiceTranslationsLoadingStatus = 'idle';
      })
      builder.addCase(fetchVoiceTranslations.rejected, state => { state.voiceTranslationsLoadingStatus = 'error' })
      builder.addDefaultCase(() => { })
   }
})

export default voiceTranslationsSlice.reducer;