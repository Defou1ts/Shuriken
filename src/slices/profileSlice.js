import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selectedOption: 'Списки',
	options: ['Списки'],
	notesTypes: [
		{
			name: 'planning',
			text: 'В планах',
			color: '#D1D35F',
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
	showProfileSettings: false,
	showProfileMessange: false,
	profileMessage: '',
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
		setShowProfileSettings: (state, action) => {
			state.showProfileSettings = action.payload;
		},
		setShowProfileMessange: (state, action) => {
			state.showProfileMessange = action.payload;
		},
		setProfileMessange: (state, action) => {
			state.profileMessage = action.payload;
		},
	},
});

export const {
	setSelectedOption,
	setActiveNotesFilter,
	setShowProfileSettings,
	setShowProfileMessange,
	setProfileMessange,
} = profileSlice.actions;

export default profileSlice.reducer;
