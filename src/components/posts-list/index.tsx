import React, { useCallback, useEffect, useRef } from 'react';
import { SimpleGrid } from '@mantine/core';

import { Post } from 'components/post';

import { Post as PostType } from 'types/posts';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setLimit } from 'store/slices/posts';

interface IPostsListProps {
    posts: PostType[];
    isLoadMore?: boolean;
}
export const PostsList = ({ posts, isLoadMore = true }: IPostsListProps) => {
    const dispatch = useAppDispatch();
    const limit = useAppSelector((store) => store.posts.limit);

    const observer = useRef<IntersectionObserver>();

    const lastPostRef = useCallback(
        (node: HTMLDivElement) => {
            if (observer.current) observer.current!.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) dispatch(setLimit(limit + 12));
            });
            if (node) observer.current!.observe(node);
        },
        [posts.length],
    );

    return (
        <SimpleGrid cols={3}>
            {posts.map((post) => (
                <Post ref={isLoadMore ? lastPostRef : null} key={post._id} post={post} />
            ))}
        </SimpleGrid>
    );
};
