import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SideBarData = [
    {
        title: 'Dashboard',
        path: '/instructor-dashboard',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'My courses',
        path: '/instructor-my-courses',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    }
]