import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedOption: 'Списки',
    options: ['Списки', 'Друзья', 'Комментарии'],
    notesTypes: [
        {
            name: 'planning',
            text: 'В планах',
        },
        {
            name: 'watch',
            text: 'Смотрю',
        },
        {
            name: 'watched',
            text: 'Просмотрено',
        },
        {
            name: 'thrown',
            text: 'Брошено',
        },
        {
            name: 'liked',
            text: 'Любимые',
        },
    ],
    activeNotesFilter: 'all',
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setSelectedOption: (state, action) => {
            state.selectedOption = action.payload;
        },
        setActiveNotesFilter: (state, action) => {
            state.activeNotesFilter = action.payload;
        },
    },
});

export const { setSelectedOption, setActiveNotesFilter } = profileSlice.actions;

export default profileSlice.reducer;
