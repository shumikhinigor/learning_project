import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';

import {
    PostsResponse,
    getPosts as getPostsRequest,
    deletePost as deletePostRequest,
    addToFavoritePosts as addToFavoritePostsRequest,
    removeFromFavoritePosts as removeFromFavoritePostsRequest,
} from 'api/posts';
import { createAppAsyncThunk } from 'store/hooks';
import { Post } from 'types/posts';
import { isActionFulfilled, isActionPending, isActionRejected } from 'utils/redux';

interface PostsState {
    loading: boolean;
    data: PostsResponse;
    error: SerializedError | null;
}

const initialState: PostsState = { data: { posts: [], postLength: 0, total: 0 }, loading: false, error: null };

const POSTS_API_KEY = '/posts';
const DELETE_POST_API_KEY = `${POSTS_API_KEY}/:id/delete`;
const FAVORITE_POST_API_KEY = `${POSTS_API_KEY}/:id/likes`;

export const getPosts = createAppAsyncThunk<PostsResponse, Params>(
    POSTS_API_KEY,
    async (params: Params, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await getPostsRequest(params);
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const deletePost = createAppAsyncThunk<Post, string>(
    DELETE_POST_API_KEY,
    async (postID: string, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await deletePostRequest(postID);
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const addToFavoritePosts = createAppAsyncThunk<Post, string>(
    FAVORITE_POST_API_KEY,
    async (postID: string, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await addToFavoritePostsRequest(postID);
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
export const removeFromFavoritePosts = createAppAsyncThunk<Post, string>(
    FAVORITE_POST_API_KEY,
    async (postID: string, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await removeFromFavoritePostsRequest(postID);
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const postsSlice = createSlice<PostsState>({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state: PostsState, action: PayloadAction<Post[]>) => {
            if (!state.data) return;
            state.data.posts = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;

                state.data.total = state.data.total - 1;
                state.data.postLength = state.data.postLength - 1;
                state.data.posts = state.data.posts.filter((post) => post._id !== action.payload._id);
            })
            .addMatcher(isActionFulfilled(FAVORITE_POST_API_KEY), (state, action) => {
                state.error = null;
                state.loading = false;
                state.data.posts = state.data.posts.map((post) => {
                    return action.payload._id === post._id ? action.payload : post;
                });
            })

            .addMatcher(isActionPending(POSTS_API_KEY), (state) => {
                state.error = null;
                state.loading = true;
            })
            .addMatcher(isActionRejected(POSTS_API_KEY), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPosts } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
