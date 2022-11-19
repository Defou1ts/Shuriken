import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedOption: 'Списки',
    options: ['Списки', 'Друзья', 'Комментарии'],
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setSelectedOption: (state, action) => {
            state.selectedOption = action.payload;
        },
    },
});

export const { setSelectedOption } = profileSlice.actions;

export default profileSlice.reducer;
