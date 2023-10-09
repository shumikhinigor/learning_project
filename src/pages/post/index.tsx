import React, { useEffect, useState } from 'react';
import { Container, Button, Center, Loader } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { getPost } from 'api/posts';

import { PATHS } from 'routes';

import { Post as PostType } from 'types/posts';

import { Post as PostCard } from 'components/post';
import { Layout } from 'components/ui';

export const Post = () => {
    const { state } = useLocation();
    const { postID = '' } = useParams();

    const [post, setPost] = useState<PostType>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getPost(postID)
            .then((data) => setPost(data.data))
            .finally(() => setLoading(false));
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
