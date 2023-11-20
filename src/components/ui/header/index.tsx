import React from 'react';
import { Container, Group, Text } from '@mantine/core';
import { Link, NavLink } from 'react-router-dom';

import { IconLogout } from '@tabler/icons-react';

import { PATHS } from 'routes';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import Logo from 'assets/logo.svg?react';

import classes from './styles.module.css';
import { setAccessToken } from 'store/slices/auth';

export const Header = () => {
    const dispatch = useAppDispatch();

    const accessToken = useAppSelector((store) => store.auth.accessToken);

    const handleLogout = () => {
        dispatch(setAccessToken(null));
    };

    return (
        <Container h={'100%'}>
            <Group h={'100%'} justify={'space-between'}>
                <Link to={PATHS.HOME}>
                    <Logo color={'var(--mantine-primary-color-filled)'} mr={'auto'} />
                </Link>
                {accessToken && (
                    <Group align={'center'}>
                        <NavLink to={PATHS.POSTS} className={classes.link}>
                            <Text>Посты</Text>
                        </NavLink>
                        <NavLink to={PATHS.FAVORITES} className={classes.link}>
                            <Text>Избранное</Text>
                        </NavLink>
                        <NavLink to={PATHS.PROFILE} className={classes.link}>
                            <Text>Профиль</Text>
                        </NavLink>

                        <IconLogout stroke={1.5} className={classes.link} onClick={handleLogout} />
                    </Group>
                )}
            </Group>
        </Container>
    );
};
