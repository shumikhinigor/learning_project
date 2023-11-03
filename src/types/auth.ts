import { User } from 'types/users';

export interface SignUpFormData extends Pick<User, 'email'> {
    group: string;
    password: string;
}

export interface SignInFormData extends Pick<User, 'email'> {
    password: string;
}

export interface SignInResponse {
    data: User;
    token: string;
}
