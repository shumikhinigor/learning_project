import React from 'react';
import type { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from 'store/hooks';
import { PATHS } from 'routes';

export const withProtect = (WrappedComponent: ComponentType) => {
    const ReturnedComponent: React.FC = () => {
        const location = useLocation();

        const accessToken = useAppSelector((store) => store.auth.accessToken);

        if (!accessToken) return <Navigate to={PATHS.LOGIN} state={{ from: location.pathname }} />;

        return <WrappedComponent />;
    };

    ReturnedComponent.displayName = `withProtection(${WrappedComponent.displayName || 'Component'})`;

    return ReturnedComponent;
};
