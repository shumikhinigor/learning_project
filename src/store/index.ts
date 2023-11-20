import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi, usersApi, postsApi } from 'store/api';
import { authReducer } from 'store/slices/auth';
import { postsReducer, postsSliceName } from 'store/slices/posts';
import { postReducer } from 'store/slices/post';

const rootReducer = combineReducers({
    auth: authReducer,
    post: postReducer,
    posts: postsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
});

const persistConfig = {
    storage,
    key: 'root',
    version: 1,
    blacklist: [authApi.reducerPath, usersApi.reducerPath, postsApi.reducerPath, postsSliceName],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    // TODO: really need?
    middleware: (getDefaultMiddleware: typeof getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] },
        }).concat([authApi.middleware, usersApi.middleware, postsApi.middleware]);
    },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
