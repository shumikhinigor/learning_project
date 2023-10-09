export interface Post {
    _id: string;

    text: string;
    title: string;
    image: string;

    likes: string[];
    comments: string[];
    isPublished: boolean;

    tags: string[];
}
