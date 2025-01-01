import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./slices/favoritesSlice";
import notficationsReducer from "./slices/notificationsSlice";

export const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    notifications: notficationsReducer
  },
});