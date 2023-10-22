import React from 'react';
import { Center, Title } from '@mantine/core';
import type { BoxProps } from '@mantine/core';

interface StubProps extends BoxProps {
    text: string;
}
export const Stub = ({ text, ...props }: StubProps) => {
    return (
        <Center {...props}>
            <Title order={2}>{text}</Title>
        </Center>
    );
};
