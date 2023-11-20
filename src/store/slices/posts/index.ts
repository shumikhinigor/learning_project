import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PostsState {
    limit: number;
}

const initialState: PostsState = { limit: 12 };

export const postsSliceName = 'posts';

const postsSlice = createSlice<PostsState>({
    name: postsSliceName,
    initialState,
    reducers: {
        setLimit: (state: PostsState, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
    },
});

export const postsReducer = postsSlice.reducer;
export const { setLimit } = postsSlice.actions;
