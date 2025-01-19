import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { favoritesApi } from './api/favoritesApi';
import { notificationsApi } from './api/notificationsApi';
import { userApi } from './api/userApi';
import { rtkQueryErrorMiddleware } from './middlewares/errorMiddleware';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import errorReducer from './slices/errorSlice';
import favoriteReducer from './slices/favoritesSlice';
import notficationsReducer from './slices/notificationsSlice';

export const store = configureStore({
    reducer: {
        favorites: favoriteReducer,
        notifications: notficationsReducer,
        cart: cartReducer,
        error: errorReducer,
        auth: authReducer,
        [favoritesApi.reducerPath]: favoritesApi.reducer,
        [notificationsApi.reducerPath]: notificationsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(favoritesApi.middleware)
            .concat(notificationsApi.middleware)
            .concat(userApi.middleware)
            .concat(rtkQueryErrorMiddleware)
            .concat(authApi.middleware),
});
