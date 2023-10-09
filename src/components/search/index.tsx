import React, { Dispatch, useState } from 'react';
import { rem, TextInput, TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import { useDebounceCallback } from 'hooks/useDebounceCallback';

interface SearchProps extends Pick<TextInputProps, 'value'> {
    onSearch: Dispatch<string>;
}

export const Search = ({ value = '', onSearch }: SearchProps) => {
    const [search, setSearch] = useState(value);
    const onSearchDebounce = useDebounceCallback(onSearch, 300);

    const handleInput = (evt) => {
        const value = evt.target.value;

        setSearch(value);
        onSearchDebounce(value);
    };

    return (
        <TextInput
            size={'md'}
            radius={'xl'}
            value={search}
            onInput={handleInput}
            placeholder={'Найти'}
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
        />
    );
};
