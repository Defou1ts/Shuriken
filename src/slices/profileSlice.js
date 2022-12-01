import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedOption: 'Списки',
    options: ['Списки'],
    notesTypes: [
        {
            name: 'planning',
            text: 'В планах',
            color:'#D1D35F'
        },
        {
            name: 'watch',
            text: 'Смотрю',
            color: '#6FBB6D',
        },
        {
            name: 'watched',
            text: 'Просмотрено',
            color: '#5069C4',
        },
        {
            name: 'thrown',
            text: 'Брошено',
            color: '#232923',
        },
        {
            name: 'liked',
            text: 'Любимые',
            color: '#C857A1',
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
