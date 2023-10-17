import React from 'react';

import { Home } from 'pages/home';
import { Post } from 'pages/post';
import { Posts } from 'pages/posts';
import { Profile } from 'pages/profile';
import { NotFound } from 'pages/not-found';
import { Favorites } from 'pages/favorites';

export const PATHS = {
    HOME: '/',
    LOGIN: '/login',
    POSTS: '/posts',
    PROFILE: '/profile',
    POST: '/posts/:postID',
    FAVORITES: '/favorites',
};

export const ROUTES = [
    {
        path: PATHS.HOME,
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: PATHS.POSTS,
        element: <Posts />,
        errorElement: <NotFound />,
    },
    {
        path: PATHS.POST,
        element: <Post />,
        errorElement: <NotFound />,
    },
    {
        path: PATHS.PROFILE,
        element: <Profile />,
        errorElement: <NotFound />,
    },
    {
        path: PATHS.FAVORITES,
        element: <Favorites />,
        errorElement: <NotFound />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
];
