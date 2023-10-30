import React, { useMemo } from 'react';
import { Container, Loader, Center, Stack, Pagination } from '@mantine/core';

import { useQuery } from 'hooks/useQuery';

import { Stub, Layout } from 'components/ui';
import { Search } from 'components/search';
import { PostsList } from 'components/posts-list';
import { withProtect } from 'hocs/withProtect';
import { useGetPostsQuery } from 'store/api';

const LIMIT = 6;

export const Posts = withProtect(() => {
    const { params, updateParams } = useQuery();

    const { search = '', page = 1 } = params;

    const { data, isFetching } = useGetPostsQuery({ query: search, page, limit: LIMIT });

    const total = useMemo(() => Math.ceil(data?.total / LIMIT), [data?.total]);

    const handleChangePage = (value) => updateParams('page', value);
    const handleChangeSearch = (value) => updateParams('search', value);

    return (
        <Layout>
            <Container py={24} h={'100%'}>
                <Search value={search} onSearch={handleChangeSearch} />

                {isFetching ? (
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
});
