import React, { useEffect, useMemo } from 'react';
import { Container, Loader, Center, Stack } from '@mantine/core';

import { useQuery } from 'hooks/useQuery';

import { getPosts } from 'store/slices/posts';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Layout, Stub } from 'components/ui';
import { Search } from 'components/search';
import { PostsList } from 'components/posts-list';

export const Favorites = () => {
    const { params, updateParams } = useQuery();

    const dispatch = useAppDispatch();
    const { data: user } = useAppSelector((store) => store.user);
    const { data, loading } = useAppSelector((store) => store.posts);

    const { search = '', page = 1 } = params;

    const favorites = useMemo(() => {
        if (!user) return [];
        return data.posts.filter((post) => post.likes.includes(user._id));
    }, [user?._id, data.posts]);

    const handleChangeSearch = (value) => updateParams('search', value);

    useEffect(() => {
        dispatch(getPosts({ query: search }));
    }, [search, page]);

    return (
        <Layout>
            <Container py={24} h={'100%'}>
                <Search value={search} onSearch={handleChangeSearch} />

                {!favorites.length && loading ? (
                    <Center mt={24}>
                        <Loader type={'bars'} />
                    </Center>
                ) : favorites.length ? (
                    <Stack mt={24}>
                        <PostsList posts={favorites} />
                    </Stack>
                ) : (
                    <Stub text={search ? 'Ничего не найдено' : 'Постов нет :('} mt={24} />
                )}
            </Container>
        </Layout>
    );
};
