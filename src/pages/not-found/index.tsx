import React from 'react';
import { Container, Title, Stack, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

import { PATHS } from 'routes';

import { Layout } from 'components/ui';

export const NotFound = () => {
    return (
        <Layout>
            <Container py={24} h={'100%'} pt={130}>
                <Stack align={'center'} justify={'center'}>
                    <Title order={1} size={142} c={'var(--mantine-primary-color-filled)'}>
                        404
                    </Title>
                    <Title order={2} size={42}>
                        Страница не найдена
                    </Title>
                    <Link to={PATHS.HOME}>
                        <Button>Перейти на главную</Button>
                    </Link>
                </Stack>
            </Container>
        </Layout>
    );
};
