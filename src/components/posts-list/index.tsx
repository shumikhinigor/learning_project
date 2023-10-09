import React from 'react';
import { SimpleGrid } from '@mantine/core';

import { Post } from 'components/post';

import { Post as PostType } from 'types/posts';

interface IPostsListProps {
    posts: PostType[];
}
export const PostsList = ({ posts }: IPostsListProps) => {
    return (
        <SimpleGrid cols={3}>
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </SimpleGrid>
    );
};
