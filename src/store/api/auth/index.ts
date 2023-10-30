import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from 'store/api/config';

import { User } from 'types/users';
import { SignInFormData, SignInResponse, SignUpFormData } from 'types/auth';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        signUp: builder.mutation<User, SignUpFormData>({
            query: (data: SignUpFormData) => ({ body: data, url: '/signup', method: 'post' }),
        } as Parameters<typeof builder.mutation>),
        signIn: builder.mutation<SignInResponse, SignInFormData>({
            query: (data: SignInFormData) => ({ body: data, url: '/signin', method: 'post' }),
        } as Parameters<typeof builder.mutation>),
    }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
