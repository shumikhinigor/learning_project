import { Api } from 'utils/api';

import { User } from 'types/users';

export const getUser = async () => {
    return await Api.request<User>({ method: 'get', url: `/users/me` });
};
