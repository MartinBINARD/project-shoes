import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserId: (state, action) => {
            state.id = action.payload;
        },
    },
});

export const { setUserId } = userSlice.actions;
export default userSlice.reducer;
