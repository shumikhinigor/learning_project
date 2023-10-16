import { Api } from 'utils/api';

import { Post } from 'types/posts';

export interface PostsResponse {
    posts: Post[];
    total: number;
    postLength: number;
}
export const getPosts = async (params: Params) => {
    return await Api.request<PostsResponse>({ method: 'get', url: '/posts/paginate', params });
};

export const getPost = async (postID: string) => {
    return await Api.request<Post>({ method: 'get', url: `/posts/${postID}` });
};

export const addToFavoritePosts = async (postID: string) => {
    return await Api.request<Post>({ method: 'put', url: `/posts/likes/${postID}` });
};

export const removeFromFavoritePosts = async (postID: string) => {
    return await Api.request<Post>({ method: 'delete', url: `/posts/likes/${postID}` });
};
