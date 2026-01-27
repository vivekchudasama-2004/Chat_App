import React from 'react';
import { BsGrid, BsPencil, BsHeart, BsMusicNote, BsPlay, BsChat, BsFlag, BsBook } from 'react-icons/bs';

export const sidebarNavigationItems = [
    { label: 'Dashboard', icon: <BsGrid />, path: '/dashboard' },
    { label: 'Note', icon: <BsPencil />, path: '/note' },
    { label: 'Dreamboard', icon: <BsHeart />, path: '/dreamboard' },
    { label: 'Audios', icon: <BsMusicNote />, path: '/audios' },
    { label: 'Motivational videos', icon: <BsPlay />, path: '/videos' },
    { label: 'Messages', icon: <BsChat />, path: '/messages' },
    { label: 'Goal Setting', icon: <BsFlag />, path: '/goals' },
    { label: 'Books', icon: <BsBook />, path: '/books' },
];
