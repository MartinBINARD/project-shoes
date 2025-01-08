import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoritesApi = createApi({
    reducerPath: 'favoritesApi',
    baseQuery: fetchBaseQuery({ baseUrl: EXPO_PUBLIC_API_URL }),
    tagTypes: ['Favorites'],
    endpoints: (build) => ({
        getAllFavorites: build.query({
            providesTags: ['Favorites'],
            query: () => 'favorites.json',
            transformResponse: (response) => {
                const favorites = [];
                for (const key in response) {
                    const favorite = {
                        id: key,
                        ...response[key],
                    };
                    favorites.push(favorite);
                }

                return favorites;
            },
        }),
        addFavorite: build.mutation({
            invalidatesTags: 'Favorites',
            query: (shoesId) => ({
                url: 'favorites.json',
                method: 'POST',
                body: shoesId,
            }),
        }),
        removeFavorite: build.mutation({
            invalidatesTags: 'Favorites',
            query: ({ id }) => ({
                url: `favorites/${id}.json`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const { useGetAllFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } = favoritesApi;
