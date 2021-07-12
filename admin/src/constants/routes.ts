import { DashboardPage } from 'pages/Dashboard';
import { CompaniesPage, EmployeesPage } from 'pages/Company';
import { LoginPage, RegisterPage } from 'pages/Auth';
import { route } from '../types';

export const authenticatedRoutes: route[] = [
  {
    path: '/',
    component: DashboardPage,
  },
  {
    path: '/companies',
    component: CompaniesPage,
  },
  {
    path: '/employees',
    component: EmployeesPage,
  },
];

export const unauthenticatedRoutes: route[] = [
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: RegisterPage,
  },
];
