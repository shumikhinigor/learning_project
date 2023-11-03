import React, { useMemo } from 'react';
import { Container, Center, Loader, Group, Avatar, Text, Title, Stack, Image, Box } from '@mantine/core';
import { IconHeart, IconMessageCircle } from '@tabler/icons-react';
import { useParams } from 'react-router-dom';

import { Layout } from 'components/ui';
import { Comment } from 'components/comment';
import { useGetPostQuery, useGetUserQuery } from 'store/api';
import { withProtect } from 'hocs/withProtect';

export const Post = withProtect(() => {
    const { postID = '' } = useParams();

    const { data: user } = useGetUserQuery();
    const { data: post, isLoading } = useGetPostQuery(postID);

    const isFavorite = useMemo<boolean>(() => {
        if (!user || !post) return false;
        return post.likes.includes(user._id);
    }, [user?._id, post?.likes]);

    return (
        <Layout>
            <Container py={24} h={'100%'}>
                {isLoading ? (
                    <Center mt={24}>
                        <Loader type={'bars'} />
                    </Center>
                ) : post ? (
                    <Stack gap={0}>
                        <Box>
                            <Image
                                height={300}
                                radius={'md'}
                                src={post.image}
                                fallbackSrc={'https://placehold.co/400x200?text=404'}
                            />
                        </Box>
                        <Group align={'center'} gap={16} mt={8} ml={'auto'}>
                            <Group
                                gap={4}
                                align={'center'}
                                c={isFavorite ? 'var(--mantine-color-red-7)' : 'var(--mantine-color-text)'}
                            >
                                <IconHeart width={24} height={24} stroke={1.5} />
                                <Text>{post.likes.length}</Text>
                            </Group>
                            <Group align={'center'} gap={4}>
                                <IconMessageCircle width={24} height={24} stroke={1.5} />
                                <Text>{post.comments.length}</Text>
                            </Group>
                        </Group>
                        <Group gap={24} align={'flex-start'} justify={'space-between'} mt={24}>
                            <Stack w={'100%'} maw={'calc(100% - 274px)'}>
                                <Title>{post.title}</Title>
                                <Text>{post.text}</Text>
                            </Stack>
                            <Group align={'flex-start'} w={'100%'} maw={'250px'} wrap={'nowrap'} gap={18}>
                                <Avatar src={post.author.avatar} radius={'xl'} size={'lg'} />
                                <Stack gap={0} style={{ flex: 1, wordBreak: 'break-word' }} w={'100%'}>
                                    <Text size={'md'} fw={500}>
                                        {post.author.name}
                                    </Text>
                                    <Text c={'dimmed'} size={'sm'}>
                                        {post.author.about}
                                    </Text>
                                </Stack>
                            </Group>
                        </Group>
                        {!!post.comments.length && (
                            <Stack mt={24}>
                                <Title order={2}>Комментарии</Title>
                                <Stack>
                                    {post.comments.map((comment) => {
                                        return <Comment key={comment._id} comment={comment} />;
                                    })}
                                </Stack>
                            </Stack>
                        )}
                    </Stack>
                ) : null}
            </Container>
        </Layout>
    );
});
