import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from 'store/api/config';

import type { User } from 'types/users';
import { ProfileFormData } from 'types/users';

export const usersApi = createApi({
    tagTypes: ['Users'],
    reducerPath: 'usersApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        getUser: builder.query<User, void>({
            query: () => `/users/me`,
        } as Parameters<typeof builder.mutation>),
        updateUser: builder.mutation<User, ProfileFormData>({
            query: (data: ProfileFormData) => {
                return {
                    body: data,
                    method: 'PATCH',
                    url: `/users/me`,
                };
            },
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                await queryFulfilled;

                const patchResult = dispatch(
                    usersApi.util.updateQueryData('getUser', undefined, (draft) => {
                        Object.assign(draft, data);
                    }),
                );

                queryFulfilled.catch(patchResult.undo);
            },
        } as Parameters<typeof builder.mutation>),
        updateUserAvatar: builder.mutation<User, Pick<User, 'avatar'>>({
            query: (data: Pick<User, 'avatar'>) => {
                return {
                    body: data,
                    method: 'PATCH',
                    url: `/users/me/avatar`,
                };
            },
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                await queryFulfilled;

                const patchResult = dispatch(
                    usersApi.util.updateQueryData('getUser', undefined, (draft) => {
                        Object.assign(draft, data);
                    }),
                );

                queryFulfilled.catch(patchResult.undo);
            },
        } as Parameters<typeof builder.mutation>),
    }),
});

export const { useGetUserQuery, useUpdateUserMutation, useUpdateUserAvatarMutation } = usersApi;
