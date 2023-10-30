import { User } from 'types/users';

interface PostAuthor extends User {
    group: string;
}
export interface PostComment {
    _id: string;
    post: string;
    text: string;
    author: PostAuthor;
    created_at: string;
    updated_at: string;
}

type PostTag = 'myVacation' | 'holidays' | 'legendary' | 'peace' | 'kaif';

export interface Post {
    _id: string;

    text: string;
    title: string;
    image: string;

    tags: PostTag[];
    likes: string[];
    isPublished: boolean;
    comments: PostComment[];

    author: PostAuthor;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
    postLength: number;
}
