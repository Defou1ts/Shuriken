import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedOption: 'Списки',
    options: ['Списки', 'Друзья', 'Комментарии'],
    notesTypes: [
        {
            name: 'planning',
            text: 'В планах',
            color:'blue'
        },
        {
            name: 'watch',
            text: 'Смотрю',
            color: 'yellow',
        },
        {
            name: 'watched',
            text: 'Просмотрено',
            color: 'green',
        },
        {
            name: 'thrown',
            text: 'Брошено',
            color: 'pink',
        },
        {
            name: 'liked',
            text: 'Любимые',
            color: 'red',
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
