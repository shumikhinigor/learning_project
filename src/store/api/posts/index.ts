import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from 'store/api/config';

import type { Post, PostsResponse } from 'types/posts';

export const postsApi = createApi({
    tagTypes: ['Posts'],
    reducerPath: 'postsApi',
    baseQuery: customBaseQuery,
    endpoints: (builder) => ({
        // with pagination and query search
        getPosts: builder.query<PostsResponse, Params>({
            providesTags: [{ type: 'Posts', id: 'LIST' }],
            query: (params: Params) => ({ url: `/posts/paginate`, params }),
        } as Parameters<typeof builder.query>),
        // without pagination
        getAllPosts: builder.query<Post[], Params>({
            query: (params: Params) => ({ url: `/posts`, params }),
            providesTags: [{ type: 'Posts', id: 'LIST' }],
        } as Parameters<typeof builder.query>),
        getPost: builder.query<Post, string>({
            providesTags: [{ type: 'Posts', id: 'ITEM' }],
            query: (postID: string) => ({ url: `/posts/${postID}` }),
        } as Parameters<typeof builder.query>),
        addToFavoritePosts: builder.mutation<Post, string>({
            // TODO: add optimistic updates
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            query: (postID: string) => ({ url: `/posts/likes/${postID}`, method: 'put' }),
        } as Parameters<typeof builder.mutation>),
        removeFromFavoritePosts: builder.mutation<Post, string>({
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            query: (postID: string) => ({ url: `/posts/likes/${postID}`, method: 'delete' }),
        } as Parameters<typeof builder.mutation>),
    }),
});

export const {
    useGetPostQuery,
    useGetPostsQuery,
    useGetAllPostsQuery,
    useAddToFavoritePostsMutation,
    useRemoveFromFavoritePostsMutation,
} = postsApi;
