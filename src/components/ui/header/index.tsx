import React from 'react';
import { Container, Group, Avatar, Text } from '@mantine/core';
import { IconHeart, IconUserCircle } from '@tabler/icons-react';
import { Link, NavLink } from 'react-router-dom';

import { PATHS } from 'routes';

import Logo from 'assets/logo.svg?react';
import { useAppSelector } from 'store/hooks';

import classes from './styles.module.css';

export const Header = () => {
    const { data: user } = useAppSelector((store) => store.user);

    if (!user) return;

    return (
        <Container h={'100%'}>
            <Group h={'100%'} justify={'space-between'}>
                <Link to={PATHS.HOME}>
                    <Logo color={'var(--mantine-primary-color-filled)'} mr={'auto'} />
                </Link>
                <Group align={'center'}>
                    <NavLink to={PATHS.POSTS} className={classes.link}>
                        <Text>Посты</Text>
                    </NavLink>
                    <NavLink to={PATHS.FAVORITES} className={classes.link}>
                        <Text>Избранное</Text>
                    </NavLink>
                    <Link to={PATHS.PROFILE}>
                        <Avatar src={user.avatar} size={'md'} />
                    </Link>
                </Group>
            </Group>
        </Container>
    );
};
