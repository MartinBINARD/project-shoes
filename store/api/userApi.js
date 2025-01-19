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
        getUserById: builder.query({
            query: ({ userId, token }) => `users/${userId}.json?auth=${token}`,
        }),
        createUser: builder.mutation({
            query: ({ user, token, id }) => ({
                url: `users/${id}.json?auth=${token}`,
                method: 'PUT',
                body: user,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ userId, token, ...patch }) => ({
                url: `users/${userId}.json?auth=${token}`,
                method: 'PATCH',
                body: patch,
            }),
            async onQueryStarted({ userId, token, ...patch }, { dispatch, queryFulfilled }) {
                try {
                    const patchResult = dispatch(
                        userApi.util.updateQueryData('getUserById', { userId, token }, (existingUser) => {
                            Object.assign(existingUser, patch);
                        }),
                    );
                } catch (error) {
                    console.log({ error });
                }
                try {
                    await queryFulfilled;
                } catch (err) {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const { useGetUserQuery, useGetUserByIdQuery, useCreateUserMutation, useLazyGetUserQuery, useUpdateUserMutation } = userApi;
