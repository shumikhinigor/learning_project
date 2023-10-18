import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import type { MantineThemeOverride } from '@mantine/core';
import { MantineProvider, createTheme } from '@mantine/core';

import { getUser } from 'store/slices/users';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { ROUTES } from 'routes';

export const theme = createTheme({
    /* Put your mantine theme override here */
} as MantineThemeOverride);

const router = createBrowserRouter(ROUTES);

export const App = () => {
    const dispatch = useAppDispatch();
    const { data: user, loading } = useAppSelector((store) => store.user);

    useEffect(() => {
        dispatch(getUser());
    }, []);

    if (!user && loading) return;
    // TODO: navigate to login
    if (!user) return;

    return (
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
        </MantineProvider>
    );
};
