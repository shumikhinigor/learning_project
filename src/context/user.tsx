import React, { memo, useContext } from 'react';
import { User } from 'types/users';

interface UserContext {
    user: User;
}
const UserContext = React.createContext<UserContext>({ user: {} as User });

interface UserProvider {
    user: User;
    children: React.ReactNode;
}

export const UserProvider = memo(({ user, children }: UserProvider) => {
    return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
});

UserProvider.displayName = 'UserContext';

export const useUserContext = () => useContext(UserContext);
