import React from 'react';
import { Container, Group } from '@mantine/core';
import { IconHeart, IconUserCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

import { PATHS } from 'routes';

import Logo from 'assets/logo.svg?react';

export const Header = () => {
    return (
        <Container h={'100%'}>
            <Group h={'100%'} justify={'space-between'}>
                <Link to={PATHS.HOME}>
                    <Logo color={'var(--mantine-primary-color-filled)'} mr={'auto'} />
                </Link>
                <Group>
                    <Link to={PATHS.FAVORITES}>
                        <IconHeart color={'var(--mantine-primary-color-filled)'} />
                    </Link>
                    <Link to={PATHS.PROFILE}>
                        <IconUserCircle color={'var(--mantine-primary-color-filled)'} />
                    </Link>
                </Group>
            </Group>
        </Container>
    );
};
