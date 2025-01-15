import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errorHttp: false,
};

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setErrorHttp: (state, action) => {
            state.errorHttp = action.payload;
        },
    },
});

export const { setErrorHttp } = errorSlice.actions;
export default errorSlice.reducer;
