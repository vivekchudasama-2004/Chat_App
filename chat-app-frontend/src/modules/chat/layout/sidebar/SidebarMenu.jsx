import { BsGrid, BsHeart, BsMusicNote,BsFlag,} from 'react-icons/bs';
import { MdOutlineNoteAlt } from "react-icons/md";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { LuBookText } from "react-icons/lu";
import { HiOutlineEnvelope } from "react-icons/hi2";


export const sidebarItems = [
    { label: 'Dashboard', icon: <BsGrid />, path: '/dashboard' },
    { label: 'Note', icon: <MdOutlineNoteAlt />, path: '/note' },
    { label: 'Dreamboard', icon: <BsHeart />, path: '/dreamboard' },
    { label: 'Audios', icon: <BsMusicNote />, path: '/audios' },
    { label: 'Motivational videos', icon: <AiOutlineVideoCamera />, path: '/videos' },
    { label: 'Messages', icon: <HiOutlineEnvelope />, path: '/messages' },
    { label: 'Goal Setting', icon: <BsFlag />, path: '/goals' },
    { label: 'Books', icon: <LuBookText />, path: '/books' },
];
