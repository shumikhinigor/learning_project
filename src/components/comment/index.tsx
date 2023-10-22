import React from 'react';
import { Text, Avatar, Group, Stack, Paper } from '@mantine/core';

import { PostComment } from 'types/posts';

import classes from './styles.module.css';

interface CommentProps {
    comment: PostComment;
}
export const Comment = ({ comment }: CommentProps) => {
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
        </Paper>
    );
};
