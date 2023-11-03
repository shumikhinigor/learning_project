import React, { useCallback, useRef } from 'react';
import { SimpleGrid } from '@mantine/core';

import { Post } from 'components/post';

import { Post as PostType } from 'types/posts';
import { useQuery } from 'hooks/useQuery';

interface IPostsListProps {
    posts: PostType[];
}
export const PostsList = ({ posts }: IPostsListProps) => {
    const { params, updateParams } = useQuery();
    const { limit = 12 } = params;

    const observer = useRef<IntersectionObserver>();

    const lastPostRef = useCallback(
        (node: HTMLDivElement) => {
            if (observer.current) observer.current!.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    updateParams('limit', `${Number(limit) + 12}`);
                }
            });
            if (node) observer.current!.observe(node);
        },
        [posts.length],
    );

    return (
        <SimpleGrid cols={3}>
            {posts.map((post) => (
                <Post ref={lastPostRef} key={post._id} post={post} />
            ))}
        </SimpleGrid>
    );
};
