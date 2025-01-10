import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notificationsApi = createApi({
    reducerPath: 'notificationsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_API_URL }),
    endpoints: (build) => ({
        getAllSeenNotifications: build.query({
            query: () => 'notifications.json',
            transformResponse: (response) => {
                const notifs = {};
                for (const key in response) {
                    notifs.id = key;
                    notifs.notifIds = [...response[key]];
                }
                return notifs;
            },
        }),
        addSeenNotifications: build.mutation({
            query: (notificationId) => ({
                url: 'notifications.json',
                method: 'POST',
                body: [notificationId],
            }),
            async onQueryStarted(notificationId, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const patchResult = dispatch(
                        notificationsApi.util.upsertQueryData('getAllSeenNotifications', undefined, {
                            id: data.name,
                            notifIds: [notificationId],
                        }),
                    );
                } catch {}
            },
        }),
        updateSeenNotifications: build.mutation({
            query: ({ id, notifIds }) => ({
                url: `notifications/${id}.json`,
                method: 'PUT',
                body: notifIds,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    notificationsApi.util.updateQueryData('getAllSeenNotifications', undefined, (draft) => {
                        draft.notifIds = arg.notifIds;
                    }),
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const { useGetAllSeenNotificationsQuery, useAddSeenNotificationsMutation, useUpdateSeenNotificationsMutation } = notificationsApi;
