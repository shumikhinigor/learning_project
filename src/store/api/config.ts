import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from 'store';

export const customBaseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken;

        headers.set('Content-Type', 'application/json');

        if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);

        return headers;
    },
    // TODO: really need?
} as Parameters<fetchBaseQuery>);
