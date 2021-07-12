import { MdDomain, MdGroup, MdSettings } from 'react-icons/md';
import { navigationGroup } from '../types';

export const sidebarNavigation: navigationGroup[] = [
  {
    label: 'Your business',
    links: [
      {
        href: '/companies',
        icon: MdDomain,
        label: 'Companies',
      },
      {
        href: '/employees',
        icon: MdGroup,
        label: 'Employees',
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
