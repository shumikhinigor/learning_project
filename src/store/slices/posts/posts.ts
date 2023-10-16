import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { getPosts as getPostsRequest, PostsResponse } from 'api/posts';
import { createAppAsyncThunk } from 'store/hooks';
import { Post } from 'types/posts';
import { isActionPending, isActionRejected } from 'utils/redux';

interface PostsState {
    loading: boolean;
    data: PostsResponse | null;
    error: SerializedError | null;
}

const initialState: PostsState = { data: null, loading: false, error: null };

const POSTS_API_KEY = '/posts/paginate';
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
