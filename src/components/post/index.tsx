import React, { useMemo, useState } from 'react';
import { Card, Image, Text, Tooltip, ActionIcon } from '@mantine/core';
import { generatePath, Link } from 'react-router-dom';
import { IconHeart } from '@tabler/icons-react';
import cn from 'classnames';

import { PATHS } from 'routes';

import { useAppDispatch, useAppSelector } from 'store/hooks';
import { addToFavoritePosts, removeFromFavoritePosts } from 'store/slices/posts';

import { Post as PostType } from 'types/posts';

import classes from './styles.module.css';

interface PostProps {
    post: PostType;
}
export const Post = ({ post }: PostProps) => {
    const dispatch = useAppDispatch();
    const { data: user } = useAppSelector((store) => store.user);

    const isFavorite = useMemo<boolean>(() => {
        return !!user?._id && post.likes.includes(user._id);
    }, [user?._id, post.likes]);

    const handleClickLike = () => {
        if (isFavorite) dispatch(removeFromFavoritePosts(post._id));
        else dispatch(addToFavoritePosts(post._id));
    };

    return (
        <Card withBorder h={'100%'} shadow={'xs'}>
            <Card.Section>
                <Image src={post.image} h={150} fit={'cover'} />
            </Card.Section>

            <Tooltip label={post.title} withArrow>
                <Link
                    className={classes.link}
                    state={{ location: location.pathname }}
                    to={generatePath(PATHS.POST, { postID: post._id })}
                >
                    <Text mt={8} truncate={true} c={'var(--mantine-color-text)'}>
                        {post.title}
                    </Text>
                </Link>
            </Tooltip>
            <Text c={'dimmed'} lineClamp={3} size={'sm'} mt={4} mb={12}>
                {post.text}
            </Text>
            <ActionIcon
                size={32}
                ml={'auto'}
                mt={'auto'}
                variant={'default'}
                onClick={handleClickLike}
                className={cn(classes.like, isFavorite && classes.active)}
            >
                <IconHeart stroke={1.5} />
            </ActionIcon>
        </Card>
    );
};
