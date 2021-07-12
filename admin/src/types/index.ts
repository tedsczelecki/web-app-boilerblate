import React from 'react';
import { RootState } from './RootState';

export type navigationGroup = {
  label: string;
  links: navigationLink[];
};

export type navigationLink = {
  href: string;
  icon: React.FC;
  label: string;
};

export type route = {
  path: string;
  component: React.FC;
};

export type { RootState };
