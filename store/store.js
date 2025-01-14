import { configureStore } from '@reduxjs/toolkit';
import { favoritesApi } from './api/favoritesApi';
import { notificationsApi } from './api/notificationsApi';
import { userApi } from './api/userApi';
import cartReducer from './slices/cartSlice';
import favoriteReducer from './slices/favoritesSlice';
import notficationsReducer from './slices/notificationsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        favorites: favoriteReducer,
        notifications: notficationsReducer,
        cart: cartReducer,
        user: userReducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer,
        [notificationsApi.reducerPath]: notificationsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(favoritesApi.middleware).concat(notificationsApi.middleware).concat(userApi.middleware),
});
