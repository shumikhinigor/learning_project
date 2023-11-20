import React from 'react';
import { Container, Button, Avatar, Center, Loader, Stack } from '@mantine/core';

import { useGetUserQuery } from 'store/api';
import { useAppDispatch } from 'store/hooks';
import { setAccessToken } from 'store/slices/auth';

import { withProtect } from 'hocs/withProtect';

import { Layout } from 'components/ui';
import { ProfileForm } from 'components/forms';

export const Profile = withProtect(() => {
    const { data: user, isLoading } = useGetUserQuery();

    return (
        <Layout>
            {isLoading ? (
                <Center mt={24}>
                    <Loader type={'bars'} />
                </Center>
            ) : (
                <Container py={24}>
                    <Stack>
                        <Avatar size={'xl'} src={user.avatar} alt={user.name} />
                        <ProfileForm user={user} />
                    </Stack>
                </Container>
            )}
        </Layout>
    );
});
