import { useDispatch, useSelector } from 'react-redux';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';

import type { AppDispatch, RootState } from 'store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface ThunkApiConfig {
    state: RootState;
    dispatch: AppDispatch;
    getState: () => RootState;
}
export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();
