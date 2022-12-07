import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isActiveBurger: false,
    showLoginForm: false,
    isMobile: false,
    user: null,
    authLoadingStatus: 'idle',
    registerLoadingStatus: 'idle',
    registerErrorMessage: '',
    writeLoadingStatus: 'idle',
    fileLoadingStatus: 'idle',
    updateReviewLoadingStatus: 'idle',
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
} = globalSlice.actions;

export default globalSlice.reducer;
