import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';

import { getUser } from 'api/users';

import { ROUTES } from 'routes';

import { User } from 'types/users';

import '@mantine/core/styles.css';
import { UserProvider } from 'context/user';

export const theme = createTheme({
    /* Put your mantine theme override here */
});

const router = createBrowserRouter(ROUTES);

export const App = () => {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getUser()
            .then(({ data }) => setUser(data))
            .finally(() => setLoading(false));
    }, []);

    if (!user && loading) return;
    // TODO: navigate to login
    if (!user) return;

    return (
        <MantineProvider theme={theme}>
            <UserProvider user={user}>
                <RouterProvider router={router} />
            </UserProvider>
        </MantineProvider>
    );
};
