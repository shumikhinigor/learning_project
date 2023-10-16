import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from 'store/slices/users';
import { postReducer, postsReducer } from 'store/slices/posts';

interface ConfigureStore {
    user: ReturnType<typeof userReducer>;
    post: ReturnType<typeof postReducer>;
    posts: ReturnType<typeof postsReducer>;
}

export const store = configureStore<ConfigureStore>({
    reducer: {
        user: userReducer,
        post: postReducer,
        posts: postsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
