export const STORAGE_KEYS = {
  PROVIDER: 'app-provider',
  USER_STORAGE_KEY: 'app-user',
  USER_SETTINGS: 'app-user-settings',
};

export const getStorage = key => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (e) {
    return window.localStorage.getItem(key);
  }
};

export const removeStorage = key => window.localStorage.removeItem(key);

export const setStorage = (key, val) => {
  const _val = typeof val === 'object' ? JSON.stringify(val) : val;

  return window.localStorage.setItem(key, _val);
};

export const getUserToken = () => getStorage(STORAGE_KEYS.USER_STORAGE_KEY);

export const setUserToken = token =>
  setStorage(STORAGE_KEYS.USER_STORAGE_KEY, token);

export const isAuthenticated = () => Boolean(getUserToken());

export const removeUserToken = () =>
  removeStorage(STORAGE_KEYS.USER_STORAGE_KEY);

const exports = {
  STORAGE_KEYS,
  getStorage,
  getUserToken,
  isAuthenticated,
  removeStorage,
  removeUserToken,
  setStorage,
  setUserToken,
};

export default exports;
