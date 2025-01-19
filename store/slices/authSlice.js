import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: undefined,
    userId: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
    },
});

export const { setToken, setUserId } = authSlice.actions;
export default authSlice.reducer;
