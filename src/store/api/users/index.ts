import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from 'store/api/config';

import type { User } from 'types/users';

export const usersApi = createApi({
    tagTypes: ['Users'],
    reducerPath: 'usersApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => `/users/me`,
        } as Parameters<typeof builder.mutation>),
    }),
});

export const { useGetUserQuery } = usersApi;
