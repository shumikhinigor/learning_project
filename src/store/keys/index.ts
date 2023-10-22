export const POSTS_API_KEY = '/posts';
export const USER_API_KEY = '/users/me';

export const POST_API_KEY = `${POSTS_API_KEY}/:id`;
export const DELETE_POST_API_KEY = `${POST_API_KEY}/delete`;
export const FAVORITE_POST_API_KEY = `${POST_API_KEY}/likes`;
