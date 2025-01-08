import { configureStore } from '@reduxjs/toolkit';
import { favoritesApi } from './api/favoritesApi';
import cartReducer from './slices/cartSlices';
import favoriteReducer from './slices/favoritesSlice';
import notficationsReducer from './slices/notificationsSlice';

export const store = configureStore({
    reducer: {
        favorites: favoriteReducer,
        notifications: notficationsReducer,
        cart: cartReducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(favoritesApi.middleware),
});
