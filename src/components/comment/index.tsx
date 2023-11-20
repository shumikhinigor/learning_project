import React, { ChangeEvent, useMemo } from 'react';
import { Text, Avatar, Group, Stack, Paper, ActionIcon, rem } from '@mantine/core';

import { IconX } from '@tabler/icons-react';

import { Comment as CommentType } from 'types/posts';

import classes from './styles.module.css';
import { useDeletePostCommentMutation, useGetUserQuery } from 'store/api';

interface CommentProps {
    comment: CommentType;
}
export const Comment = ({ comment }: CommentProps) => {
    const { data: user } = useGetUserQuery();

    const [deletePostComment, { isLoading: isDeleteCommentLoading }] = useDeletePostCommentMutation();

    const isMyComment = useMemo(() => {
        return comment.author._id === user._id;
    }, [user._id]);

    const handleDelete = (evt: ChangeEvent<HTMLButtonElement>) => {
        evt.preventDefault();

        deletePostComment({ postID: comment.post, commentID: comment._id });
    };

    return (
        <Paper withBorder radius={'md'} className={classes.comment} w={'100%'}>
            <Group>
                <Avatar src={comment.author.avatar} alt={comment.author.name} radius={'xl'} />
                <Stack gap={0}>
                    <Text fz={'sm'}>{comment.author.name}</Text>
                    <Text fz={'xs'} c={'dimmed'}>
                        {new Date(comment.updated_at).toDateString()}
                    </Text>
                </Stack>
            </Group>
            <Text className={classes.text}>{comment.text}</Text>
            {isMyComment && (
                <ActionIcon
                    variant={'default'}
                    onClick={handleDelete}
                    className={classes.delete}
                    disabled={isDeleteCommentLoading}
                >
                    <IconX style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
            )}
        </Paper>
    );
};
