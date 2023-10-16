import React, { useEffect } from 'react';
import { Container, Button, Center, Loader } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { PATHS } from 'routes';

import { getPost } from 'store/slices/posts';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Post as PostCard } from 'components/post';
import { Layout } from 'components/ui';

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
                {!post && loading ? (
                    <Center mt={24}>
                        <Loader type={'bars'} />
                    </Center>
                ) : post ? (
                    <PostCard post={post} />
                ) : null}
                <Link to={state?.location ? state.location : PATHS.HOME}>
                    <Button variant={'filled'} leftSection={<IconArrowLeft />} mt={24}>
                        Вернуться назад
                    </Button>
                </Link>
            </Container>
        </Layout>
    );
};
