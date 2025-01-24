import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const stripeApi = createApi({
    reducerPath: 'stripeApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_STRIP_URL }),
    endpoints: (builder) => ({
        fetcthPublishableKey: builder.query({
            query: () => '/stripe-key',
        }),
        initPayment: builder.mutation({
            query: () => ({
                url: '/payment-sheet',
                method: 'POST',
            }),
        }),
    }),
});

export const { useFetcthPublishableKeyQuery, useInitPaymentMutation } = stripeApi;
