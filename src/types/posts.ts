interface PostAuthor {
    _id: string;
    name: string;
    group: string;
    about: string;
    avatar: string;
}

type PostTag = 'myVacation' | 'holidays' | 'legendary' | 'peace' | 'kaif';

export interface Post {
    _id: string;

    text: string;
    title: string;
    image: string;

    tags: PostTag[];
    likes: string[];
    comments: string[];
    isPublished: boolean;

    author: PostAuthor;
}
