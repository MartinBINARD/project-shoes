import { createApi } from '@reduxjs/toolkit/query/react';
import { getStorage, ref } from 'firebase/storage';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryWithReauth,
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
            query: ({ userId, token }) => ({
                url: `users/${userId}.json?auth=${token}`,
            }),
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
        uploadUserPicture: builder.mutation({
            queryFn: async ({ uri, userId }) => {
                try {
                    const storage = getStorage();
                    const imageRef = ref(storage, 'images/' + userId + '.jpg');
                    //  Get file located in phone
                    const response = await fetch(uri);
                    // Preparing file for upload
                    const blobFile = await response.blob();
                    // Upload
                    const data = await uploadBytesResumable(imageRef, blobFile);
                    // Get url image
                    const url = await getDownloadURL(data.ref);
                    return { data: url };
                } catch (error) {
                    return { error };
                }
            },
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useLazyGetUserQuery,
    useUpdateUserMutation,
    useUploadUserPictureMutation,
} = userApi;
