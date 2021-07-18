import { MdDescription, MdSettings } from 'react-icons/md';
import { navigationGroup } from '../types';
import { POSTS_PATH } from 'constants/routePaths';

export const sidebarNavigation: navigationGroup[] = [
  {
    label: 'Your business',
    links: [
      {
        href: POSTS_PATH,
        icon: MdDescription,
        label: 'Posts',
      },
    ],
  },
  {
    label: 'Settings',
    links: [
      {
        href: '/settings',
        icon: MdSettings,
        label: 'Settings',
      },
    ],
  },
];
