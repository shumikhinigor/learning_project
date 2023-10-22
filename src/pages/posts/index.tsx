import React, { useEffect, useMemo } from 'react';
import { Container, Loader, Center, Stack, Pagination } from '@mantine/core';

import { useQuery } from 'hooks/useQuery';

import { getPosts } from 'store/slices/posts';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Stub, Layout } from 'components/ui';
import { Search } from 'components/search';
import { PostsList } from 'components/posts-list';

const LIMIT = 6;

export const Posts = () => {
    const { params, updateParams } = useQuery();

    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((store) => store.posts);

    const { search = '', page = 1 } = params;

    const total = useMemo(() => Math.ceil(data?.total / LIMIT), [data?.total]);

    const handleChangePage = (value) => updateParams('page', value);
    const handleChangeSearch = (value) => updateParams('search', value);

    useEffect(() => {
        dispatch(getPosts({ query: search, page, limit: LIMIT }));
    }, [search, page]);

    return (
        <Layout>
            <Container py={24} h={'100%'}>
                <Search value={search} onSearch={handleChangeSearch} />

                {!data?.posts.length && loading ? (
                    <Center mt={24}>
                        <Loader type={'bars'} />
                    </Center>
                ) : data?.posts.length ? (
                    <Stack mt={24}>
                        <PostsList posts={data.posts} />
                        <Pagination value={Number(page)} onChange={handleChangePage} total={total} />
                    </Stack>
                ) : (
                    <Stub text={search ? 'Ничего не найдено' : 'Постов нет :('} mt={24} />
                )}
            </Container>
        </Layout>
    );
};
