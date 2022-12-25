import { createSlice } from '@reduxjs/toolkit';
import { IDLE } from '../utils/consts';

const initialState = {
	isActiveBurger: false,
	showLoginForm: false,
	isMobile: false,
	user: null,
	authLoadingStatus: IDLE,
	registerLoadingStatus: IDLE,
	registerErrorMessage: '',
	writeLoadingStatus: IDLE,
	fileLoadingStatus: IDLE,
	updateReviewLoadingStatus: IDLE,
	verifyToken: null,
	verifyTokenSendLoadingStatus: IDLE,
	verifyLoadingStatus: IDLE,
	changePasswordLoadingStatus: IDLE,
};

const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setIsActiveBurger: (state, action) => {
			state.isActiveBurger = action.payload;
		},
		setShowLoginForm: (state, action) => {
			state.showLoginForm = action.payload;
		},
		setIsMobile: (state, action) => {
			state.isMobile = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
		setAuthLoadingStatus: (state, action) => {
			state.authLoadingStatus = action.payload;
		},
		setRegisterLoadingStatus: (state, action) => {
			state.registerLoadingStatus = action.payload;
		},
		setRegisterErrorMessage: (state, action) => {
			state.registerErrorMessage = action.payload;
		},
		setWriteLoadingStatus: (state, action) => {
			state.writeLoadingStatus = action.payload;
		},
		setFileLoadingStatus: (state, action) => {
			state.fileLoadingStatus = action.payload;
		},
		setUpdateReviewLoadingStatus: (state, action) => {
			state.updateReviewLoadingStatus = action.payload;
		},
		setVerifyToken: (state, action) => {
			state.verifyToken = action.payload;
		},
		setVerifyTokenSendLoadingStatus: (state, action) => {
			state.verifyTokenSendLoadingStatus = action.payload;
		},
		setVerifyLoadingStatus: (state, action) => {
			state.verifyLoadingStatus = action.payload;
		},
		setChangePasswordLoadingStatus: (state, action) => {
			state.changePasswordLoadingStatus = action.payload;
		},
	},
});

export const {
	setIsActiveBurger,
	setShowLoginForm,
	setIsMobile,
	setUser,
	setAuthLoadingStatus,
	setRegisterLoadingStatus,
	setRegisterErrorMessage,
	setWriteLoadingStatus,
	setFileLoadingStatus,
	setUpdateReviewLoadingStatus,
	setVerifyToken,
	setVerifyTokenSendLoadingStatus,
	setVerifyLoadingStatus,
	setChangePasswordLoadingStatus,
} = globalSlice.actions;

export default globalSlice.reducer;
