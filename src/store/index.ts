import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from 'store/slices/users';
import { postReducer, postsReducer } from 'store/slices/posts';

export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
        posts: postsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
