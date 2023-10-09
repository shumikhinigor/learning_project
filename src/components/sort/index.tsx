import React, { Dispatch } from 'react';
import { SegmentedControl, SegmentedControlProps } from '@mantine/core';

interface SortProps<T extends string = ''> extends Omit<SegmentedControlProps, 'onChange'> {
    onSort: Dispatch<T>;
}
export const Sort = ({ onSort, ...props }: SortProps) => {
    const handleChange = (value) => onSort(value);
    return (
        <SegmentedControl
            {...props}
            mt={24}
            size={'md'}
            radius={'xl'}
            onChange={handleChange}
            color={'var(--mantine-primary-color-filled)'}
        />
    );
};
