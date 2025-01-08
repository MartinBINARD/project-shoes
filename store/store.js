import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlices';
import favoriteReducer from './slices/favoritesSlice';
import notficationsReducer from './slices/notificationsSlice';

export const store = configureStore({
    reducer: {
        favorites: favoriteReducer,
        notifications: notficationsReducer,
        cart: cartReducer,
    },
});
