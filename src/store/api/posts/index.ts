import { createApi } from '@reduxjs/toolkit/query/react';

import { customBaseQuery } from 'store/api/config';

import type { Post, Comment } from 'types/posts';

export interface PostsResponse {
    posts: Post[];
    total: number;
    postLength: number;
}

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
            providesTags: (result) => [{ type: 'Posts', id: result.id }],
            query: (postID: string) => ({ url: `/posts/${postID}` }),
        } as Parameters<typeof builder.query>),
        addToFavoritePosts: builder.mutation<Post, string>({
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            query: (postID: string) => ({ url: `/posts/likes/${postID}`, method: 'put' }),
            async onQueryStarted(postID, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                const patchResult = dispatch(
                    postsApi.util.updateQueryData('getPost', postID, (draft) => {
                        Object.assign(draft, data);
                    }),
                );

                queryFulfilled.catch(patchResult.undo);
            },
        } as Parameters<typeof builder.mutation>),
        removeFromFavoritePosts: builder.mutation<Post, string>({
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            query: (postID: string) => ({ url: `/posts/likes/${postID}`, method: 'delete' }),
            async onQueryStarted(postID, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                const patchResult = dispatch(
                    postsApi.util.updateQueryData('getPost', postID, (draft) => {
                        Object.assign(draft, data);
                    }),
                );

                queryFulfilled.catch(patchResult.undo);
            },
        } as Parameters<typeof builder.mutation>),

        createPostComment: builder.mutation<Post, { postID: string; data: Pick<Comment, 'text'> }>({
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            query: (args: { postID: string; data: Pick<Comment, 'text'> }) => {
                const { postID, data } = args;
                return {
                    body: data,
                    method: 'POST',
                    url: `/posts/comments/${postID}`,
                };
            },
            async onQueryStarted({ postID }, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                const patchResult = dispatch(
                    postsApi.util.updateQueryData('getPost', postID, (draft) => {
                        Object.assign(draft, data);
                    }),
                );

                queryFulfilled.catch(patchResult.undo);
            },
        } as Parameters<typeof builder.mutation>),
        deletePostComment: builder.mutation<Post, { postID: string; commentID: string }>({
            invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            query: (args: { postID: string; commentID: string }) => {
                const { postID, commentID } = args;
                return {
                    method: 'DELETE',
                    url: `/posts/comments/${postID}/${commentID}`,
                };
            },
            async onQueryStarted({ postID }, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;

                const patchResult = dispatch(
                    postsApi.util.updateQueryData('getPost', postID, (draft) => {
                        Object.assign(draft, data);
                    }),
                );

                queryFulfilled.catch(patchResult.undo);
            },
        } as Parameters<typeof builder.mutation>),
    }),
});

export const {
    useGetPostQuery,
    useGetPostsQuery,
    useGetAllPostsQuery,
    useCreatePostCommentMutation,
    useDeletePostCommentMutation,
    useAddToFavoritePostsMutation,
    useRemoveFromFavoritePostsMutation,
} = postsApi;
