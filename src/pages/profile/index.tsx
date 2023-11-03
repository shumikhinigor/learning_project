import React from 'react';
import { Container, Button } from '@mantine/core';

import { Layout } from 'components/ui';
import { useAppDispatch } from 'store/hooks';
import { setAccessToken } from 'store/slices/auth';
import { withProtect } from 'hocs/withProtect';

export const Profile = withProtect(() => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(setAccessToken(null));
    };

    return (
        <Layout>
            <Container py={24}>
                <Button onClick={handleLogout}>Выйти</Button>
            </Container>
        </Layout>
    );
});
