import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `users.json`,
            transformResponse: (response, meta, { email }) => {
                let user = {};
                for (const key in response) {
                    if (response[key].email === email) {
                        user = {
                            id: key,
                            ...response[key],
                        };
                    }
                }
                return user;
            },
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: 'users.json',
                method: 'POST',
                body: user,
            }),
            transformResponse: (response) => {
                return { id: response.name };
            },
        }),
    }),
});

export const { useGetUserQuery, useCreateUserMutation, useLazyGetUserQuery } = userApi;
