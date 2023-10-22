import type { AnyAction } from '@reduxjs/toolkit';

const hasPrefix = (action: AnyAction, prefix: string): boolean => action.type.startsWith(prefix);
const isPending = (action): boolean => action.type.endsWith('/pending');
const isFulfilled = (action): boolean => action.type.endsWith('/fulfilled');
const isRejected = (action): boolean => action.type.endsWith('/rejected');

export const isActionPending = (prefix: string) => (action) => {
    return hasPrefix(action, prefix) && isPending(action);
};
export const isActionRejected = (prefix: string) => (action) => {
    return hasPrefix(action, prefix) && isRejected(action);
};
export const isActionFulfilled = (prefix: string) => (action) => {
    return hasPrefix(action, prefix) && isFulfilled(action);
};
