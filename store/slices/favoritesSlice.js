import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritesShoesIds: [],
};

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      state.favoritesShoesIds = [...state.favoritesShoesIds, action.payload];
    },
    removeFavorite: (state, action) => {
      state.favoritesShoesIds = state.favoritesShoesIds.filter(
        (currentId) => currentId !== action.payload
      );
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;