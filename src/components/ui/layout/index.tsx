import React from 'react';
import { AppShell } from '@mantine/core';

import { Header, Footer } from 'components/ui';

interface ILayoutProps {
    children: React.ReactNode;
}
export const Layout = ({ children }: ILayoutProps) => {
    return (
        // TODO: временно
        <AppShell header={{ height: 60 }} footer={{ height: 'var(--app-shell-header-offset)' }}>
            <AppShell.Header>
                <Header />
            </AppShell.Header>
            <AppShell.Main>{children}</AppShell.Main>
            <AppShell.Footer>
                <Footer />
            </AppShell.Footer>
        </AppShell>
    );
};
