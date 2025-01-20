import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import { setToken, setUserId } from '../slices/authSlice';

const baseQuery = fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL });

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    // 1 Execute query or mutation
    let result = await baseQuery(args, api, extraOptions);
    console.log(result);
    if (result?.error?.status === 401) {
        // 2 Get refreshToken
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        if (refreshToken) {
            // 3 Refresh tokens
            const refreshResult = await baseQuery(
                {
                    url: process.env.EXPO_PUBLIC_FIREBASE_TOKEN_URL + process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
                    method: 'POST',
                    body: {
                        grant_type: 'refresh_token',
                        refresh_token: refreshToken,
                    },
                },
                api,
                extraOptions,
            );
            console.log(refreshResult.data);
            if (refreshResult.data) {
                // 4 Store new tokens
                api.dispatch(setToken(refreshResult.data.id_token));
                SecureStore.setItemAsync('refreshToken', refreshResult.data.refresh_token);
                // 5 Modify params arg with new token in url
                args.url = args.url.split('auth=')[0] + `auth=${refreshResult.data.id_token}`;
                // 6 Retry initial query or mutation with new token
                result = await baseQuery(args, api, extraOptions);
                console.log(result.data);
            } else {
                // Disconnect user if refreshing has failed
                api.dispatch(setToken());
                api.dispatch(setUserId());
                SecureStore.deleteItemAsync('refreshToken');
            }
        } else {
            // Disconnect user if there is no refresh token in SecureStore
            api.dispatch(setToken());
        }
    }
    return result;
};
