import React, { useEffect, useMemo } from 'react';
import { Container, Loader, Center, Stack, Pagination } from '@mantine/core';

import { useQuery } from 'hooks/useQuery';

import { getPosts } from 'store/slices/posts';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import { Layout } from 'components/ui';
import { Sort } from 'components/sort';
import { Search } from 'components/search';
import { PostsList } from 'components/posts-list';

const SORTS = [
    { value: 'popular', label: 'Популярные' },
    { value: 'new', label: 'Новинки' },
    { value: 'rating', label: 'По рейтингу' },
];
const LIMIT = 6;

export const Posts = () => {
    const { params, updateParams } = useQuery();

    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector((store) => store.posts);

    const { search = '', page = 1 } = params;

    const total = useMemo(() => Math.ceil(data?.total / LIMIT), [data?.total]);

    const handleChangeSort = (value) => updateParams('sort', value);
    const handleChangePage = (value) => updateParams('page', value);
    const handleChangeSearch = (value) => updateParams('search', value);

    useEffect(() => {
        dispatch(getPosts({ query: search, page, limit: LIMIT }));
    }, [search, page]);

    return (
        <Layout>
            <Container py={24} h={'100%'}>
                <Search value={search} onSearch={handleChangeSearch} />
                <Sort data={SORTS} onSort={handleChangeSort} disabled />

                {!data?.posts.length && loading ? (
                    <Center mt={24}>
                        <Loader type={'bars'} />
                    </Center>
                ) : data?.posts.length ? (
                    <Stack mt={24}>
                        <PostsList posts={data.posts} />
                        <Pagination value={Number(page)} onChange={handleChangePage} total={total} />
                    </Stack>
                ) : null}
            </Container>
        </Layout>
    );
};
