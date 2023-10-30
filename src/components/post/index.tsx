import React, { useMemo, MouseEvent } from 'react';
import { Card, Text, Group, rem, Center, Image, Avatar, ActionIcon } from '@mantine/core';
import { generatePath, Link } from 'react-router-dom';
import { IconHeart } from '@tabler/icons-react';
import classNames from 'classnames';

import { PATHS } from 'routes';

import { Post as PostType } from 'types/posts';

import { useAddToFavoritePostsMutation, useGetUserQuery, useRemoveFromFavoritePostsMutation } from 'store/api';

import classes from './styles.module.css';

interface PostProps {
    post: PostType;
}
export const Post = ({ post }: PostProps) => {
    const { data: user, isFetching } = useGetUserQuery();

    const [addToFavoritePosts, { isFetching: isAddFetching }] = useAddToFavoritePostsMutation();
    const [removeFromFavoritePosts, { isFetching: isRemoveFetching }] = useRemoveFromFavoritePostsMutation();

    const isFavorite = useMemo<boolean>(() => {
        return !!user?._id && post.likes.includes(user._id);
    }, [user?._id, post.likes]);

    const handleClickLike = (evt: MouseEvent<HTMLDivElement>) => {
        evt.preventDefault();

        if (!isFavorite) addToFavoritePosts(post._id);
        else removeFromFavoritePosts(post._id);
    };

    return (
        <Card withBorder radius={'md'} className={classes.card}>
            <Card.Section>
                <Image src={post.image} height={180} fallbackSrc={'https://placehold.co/600x400?text=404'} />
            </Card.Section>
            <Link
                className={classes.link}
                state={{ location: location.pathname }}
                to={generatePath(PATHS.POST, { postID: post._id })}
            >
                <Text truncate={true} className={classes.title} color={'var(--mantine-color-text)'} fw={500}>
                    {post.title}
                </Text>
            </Link>

            <Text fz={'sm'} c={'dimmed'} lineClamp={3} mb={24}>
                {post.text}
            </Text>

            <Group justify={'space-between'} className={classes.footer} mt={'auto'} gap={8}>
                <Center maw={'calc(100% - 36px)'}>
                    <Avatar src={post.author.avatar} size={32} radius={'xl'} mr={'xs'} />
                    <Text fz={'sm'} inline truncate={true}>
                        {post.author.name}
                    </Text>
                </Center>

                <Group gap={8} mr={0}>
                    <ActionIcon
                        variant={'default'}
                        onClick={handleClickLike}
                        disabled={isFetching || isAddFetching || isRemoveFetching}
                    >
                        <IconHeart
                            style={{ width: rem(16), height: rem(16) }}
                            className={classNames(classes.like, isFavorite && classes.active)}
                        />
                    </ActionIcon>
                </Group>
            </Group>
        </Card>
    );
};
