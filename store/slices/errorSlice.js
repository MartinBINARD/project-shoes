import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    httpError: false,
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setHttpError: (state, action) => {
            state.httpError = action.payload;
        },
    },
});

export const { setHttpError } = errorSlice.actions;
export default errorSlice.reducer;
