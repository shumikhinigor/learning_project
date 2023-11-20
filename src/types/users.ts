export interface User {
    _id: string;

    __v: number;

    name: string;
    about: string;
    email: string;
    avatar: string;
}

export type ProfileFormData = Pick<User, 'name' | 'about'>;
