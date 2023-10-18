import React, { useEffect } from 'react';
import { Container, Button, Center, Loader, UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight, IconArrowLeft } from '@tabler/icons-react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { PATHS } from 'routes';

import { getPost } from 'store/slices/posts';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Layout } from 'components/ui';

import classes from './styles.module.css';

export const Post = () => {
    const { state } = useLocation();
    const { postID = '' } = useParams();

    const dispatch = useAppDispatch();
    const { data: post, loading } = useAppSelector((store) => store.post);

    useEffect(() => {
        dispatch(getPost(postID));
    }, []);

    return (
        <Layout>
            <Container py={24} h={'100%'}>
                <Link to={state?.location ? state.location : PATHS.HOME}>
                    <Button variant={'filled'} leftSection={<IconArrowLeft />} mb={24}>
                        Вернуться назад
                    </Button>
                </Link>
                {!post && loading ? (
                    <Center mt={24}>
                        <Loader type={'bars'} />
                    </Center>
                ) : post ? (
                    <React.Fragment>
                        <Group>
                            <Avatar src={post.author.avatar} radius={'xl'} />

                            <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>
                                    {post.author.name}
                                </Text>

                                <Text c="dimmed" size="xs">
                                    {post.author.about}
                                </Text>
                            </div>
                        </Group>
                    </React.Fragment>
                ) : null}
            </Container>
        </Layout>
    );
};
