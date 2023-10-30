import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    accessToken: string | null;
}

const initialState: AuthState = { accessToken: null };

const authSlice = createSlice<AuthState>({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state: AuthState, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
});

export const authReducer = authSlice.reducer;
export const { setAccessToken } = authSlice.actions;
