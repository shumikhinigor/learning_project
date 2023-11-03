import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import type { MantineThemeOverride } from '@mantine/core';
import { MantineProvider, createTheme } from '@mantine/core';

import { ROUTES } from 'routes';

export const theme = createTheme({
    /* Put your mantine theme override here */
} as MantineThemeOverride);

const router = createBrowserRouter(ROUTES);

import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
    return (
        <MantineProvider theme={theme}>
            <RouterProvider router={router} />
            <ToastContainer position={'bottom-right'} autoClose={5000} theme={'colored'} />
        </MantineProvider>
    );
};
