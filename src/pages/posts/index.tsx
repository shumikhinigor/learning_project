import React from 'react';
import { Container, Loader, Center, Stack, Title } from '@mantine/core';

import { useQuery } from 'hooks/useQuery';

import { Stub, Layout } from 'components/ui';
import { Search } from 'components/search';
import { PostsList } from 'components/posts-list';
import { withProtect } from 'hocs/withProtect';
import { useGetPostsQuery } from 'store/api';
import { useAppSelector } from 'store/hooks';

export const Posts = withProtect(() => {
    const { params, updateParams } = useQuery();

    const { search = '', page = 1 } = params;

    const limit = useAppSelector((store) => store.posts.limit);

    const { data, isFetching, isLoading } = useGetPostsQuery({ query: search, page, limit });

    const handleChangeSearch = (value) => updateParams('search', value);

    return (
        <Layout>
            <Container py={24} h={'100%'}>
                <Title mb={24}>Посты</Title>
                <Search value={search} onSearch={handleChangeSearch} />

                {isLoading ? (
                    <Center mt={24}>
                        <Loader type={'bars'} />
                    </Center>
                ) : data?.posts.length ? (
                    <Stack mt={24}>
                        <PostsList posts={data.posts} />
                        {isFetching && data.posts.length < limit && (
                            <Center>
                                <Loader type={'bars'} />
                            </Center>
                        )}
                    </Stack>
                ) : (
                    <Stub text={search ? 'Ничего не найдено' : 'Постов нет :('} mt={24} />
                )}
            </Container>
        </Layout>
    );
});
