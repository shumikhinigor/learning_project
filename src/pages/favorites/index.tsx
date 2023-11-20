import React, { useMemo } from 'react';
import { Container, Loader, Center, Title } from '@mantine/core';

import { Layout, Stub } from 'components/ui';
import { PostsList } from 'components/posts-list';
import { useGetAllPostsQuery, useGetUserQuery } from 'store/api';
import { withProtect } from 'hocs/withProtect';

export const Favorites = withProtect(() => {
    const { data: user } = useGetUserQuery();
    const { data: posts, isLoading } = useGetAllPostsQuery();

    const favorites = useMemo(() => {
        if (!user || !posts) return [];
        return posts.filter((post) => post.likes.includes(user._id));
    }, [user?._id, posts]);

    return (
        <Layout>
            <Container py={24} h={'100%'}>
                <Title mb={24}>Избранные</Title>
                {isLoading ? (
                    <Center>
                        <Loader type={'bars'} />
                    </Center>
                ) : favorites.length ? (
                    <PostsList posts={favorites} isLoadMore={false} />
                ) : (
                    <Stub text={'Постов нет :('} />
                )}
            </Container>
        </Layout>
    );
});
