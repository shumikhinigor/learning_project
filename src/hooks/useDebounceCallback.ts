import { useCallback } from 'react';
import debounce from 'lodash.debounce';

export const useDebounceCallback = <A extends unknown[]>(
    callback?: (...args: A) => void,
    delay = 300,
    options = {},
) => {
    if (!callback) return;
    return useCallback(debounce(callback, delay, options), [callback]);
};
