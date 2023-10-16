import { createSlice } from '@reduxjs/toolkit';
import type { SerializedError } from '@reduxjs/toolkit';

import { User } from 'types/users';
import { getUser as getUserRequest } from 'api/users';
import { createAppAsyncThunk } from 'store/hooks';
import { isActionPending, isActionRejected } from 'utils/redux';

interface UserState {
    loading: boolean;
    data: User | null;
    error: SerializedError | null;
}

const initialState: UserState = { data: null, loading: false, error: null };

const USER_API_KEY = '/users/me';
export const getUser = createAppAsyncThunk<User, null>(
    USER_API_KEY,
    async (_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const response = await getUserRequest();
            return fulfillWithValue(response.data);
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);

const userSlice = createSlice<UserState>({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.data = action.payload;
            })

            .addMatcher(isActionPending(USER_API_KEY), (state) => {
                state.error = null;
                state.loading = true;
            })
            .addMatcher(isActionRejected(USER_API_KEY), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const userReducer = userSlice.reducer;
