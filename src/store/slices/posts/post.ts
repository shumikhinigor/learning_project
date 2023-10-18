import { createSlice } from '@reduxjs/toolkit';
import type { SerializedError } from '@reduxjs/toolkit';

import { getPost as getPostRequest } from 'api/posts';

import { Post } from 'types/posts';

import { POST_API_KEY } from 'store/keys';
import { createAppAsyncThunk } from 'store/hooks';

import { isActionFulfilled, isActionPending, isActionRejected } from 'utils/redux';

interface PostState {
    loading: boolean;
    data: Post | null;
    error: SerializedError | null;
}

const initialState: PostState = { data: null, loading: false, error: null };

export const getPost = createAppAsyncThunk<Post, string>(
    POST_API_KEY,
    async (postID: string, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await getPostRequest(postID);
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const postSlice = createSlice<PostState>({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(isActionFulfilled(POST_API_KEY), (state, action) => {
                state.error = null;
                state.loading = false;
                state.data = action.payload;
            })
            .addMatcher(isActionPending(POST_API_KEY), (state) => {
                state.error = null;
                state.loading = true;
            })
            .addMatcher(isActionRejected(POST_API_KEY), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const postReducer = postSlice.reducer;
