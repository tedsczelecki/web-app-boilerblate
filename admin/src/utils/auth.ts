import { getUserToken } from './storage';

export const userIsLoggedIn = () => getUserToken() !== null;
