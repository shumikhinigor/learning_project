import React from 'react';
import { Container, Button } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { PATHS } from 'routes';

import { Layout } from 'components/ui';

export const Home = () => {
    return (
        <Layout>
            <Container py={24} h={'100%'}>
                <Link to={PATHS.POSTS}>
                    <Button variant={'filled'} rightSection={<IconArrowRight />}>
                        Перейти в посты
                    </Button>
                </Link>
            </Container>
        </Layout>
    );
};
