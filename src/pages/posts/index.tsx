import React, { useEffect, useState } from 'react';
import { Container, Loader, Center, Stack, Pagination } from '@mantine/core';

import { getPosts } from 'api/posts';

import { Post } from 'types/posts';

import { useQuery } from 'hooks/useQuery';

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
    const { params, setParams } = useQuery();

    const { search = '', page = 1 } = params;

    const [total, setTotal] = useState<number>(0);

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleChangeSort = (value) => setParams('sort', value);
    const handleChangePage = (value) => setParams('page', value);
    const handleChangeSearch = (value) => setParams('search', value);

    useEffect(() => {
        setLoading(true);
        getPosts({ query: search, page, limit: LIMIT })
            .then(({ data }) => {
                setPosts(data.posts);
                setTotal(Math.ceil(data.total / LIMIT));
            })
            .finally(() => setLoading(false));
    }, [search, page]);

    return (
        <Layout>
            <Container py={24} h={'100%'}>
                <Search value={search} onSearch={handleChangeSearch} />
                <Sort data={SORTS} onSort={handleChangeSort} disabled />

                {!posts.length && loading ? (
                    <Center mt={24}>
                        <Loader type={'bars'} />
                    </Center>
                ) : posts.length ? (
                    <Stack mt={24}>
                        <PostsList posts={posts} />
                        <Pagination value={Number(page)} onChange={handleChangePage} total={total} />
                    </Stack>
                ) : null}
            </Container>
        </Layout>
    );
};
