import { DashboardPage } from 'pages/Dashboard';
import { PostPage, PostsPage } from 'pages/Posts';
import { LoginPage, RegisterPage } from 'pages/Auth';
import { route } from '../types';
import {
  DASHBOARD_PATH,
  LOGIN_PATH,
  POST_PATH,
  POSTS_PATH,
  REGISTER_PATH,
} from 'constants/routePaths';

export const authenticatedRoutes: route[] = [
  {
    path: DASHBOARD_PATH,
    component: DashboardPage,
  },
  {
    path: POSTS_PATH,
    component: PostsPage,
  },
  {
    path: `${POST_PATH}/:id?`,
    component: PostPage,
  },
];

export const unauthenticatedRoutes: route[] = [
  {
    path: LOGIN_PATH,
    component: LoginPage,
  },
  {
    path: REGISTER_PATH,
    component: RegisterPage,
  },
];
