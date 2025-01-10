import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoritesApi = createApi({
    reducerPath: 'favoritesApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
    tagTypes: ['Favorites'],
    endpoints: (build) => ({
        getAllFavorites: build.query({
            providesTags: ['Favorites'],
            query: () => 'favorites.json',
            transformResponse: (response) => {
                const favorites = {};
                for (const key in response) {
                    favorites.id = key;
                    favorites.shoesIds = [...response[key]];
                }
                return favorites;
            },
        }),
        addFavorite: build.mutation({
            invalidatesTags: ['Favorites'],
            query: (shoesId) => ({
                url: 'favorites.json',
                method: 'POST',
                body: [shoesId],
            }),
        }),
        updateFavorites: build.mutation({
            invalidatesTags: ['Favorites'],
            query: ({ id, shoesIds }) => ({
                url: `favorites/${id}.json`,
                method: 'PUT',
                body: shoesIds,
            }),
        }),
    }),
});

export const { useGetAllFavoritesQuery, useAddFavoriteMutation, useUpdateFavoritesMutation } = favoritesApi;
