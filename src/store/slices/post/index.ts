import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Comment } from 'types/posts';

interface PostState {
    comment: Comment['text'];
}

const initialState: PostState = { comment: '' };

export const postSliceName = 'post';

const postSlice = createSlice<PostState>({
    name: postSliceName,
    initialState,
    reducers: {
        setComment: (state: PostState, action: PayloadAction<string>) => {
            state.comment = action.payload;
        },
    },
});

export const postReducer = postSlice.reducer;
export const { setComment } = postSlice.actions;
