import { updateUserMenu, updateUserIcon } from './user-menu';
import { authState } from '../api/auth';

export function restoreAuth() {
  const saved = localStorage.getItem('auth');

  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);

    authState.isLogged = parsed.isLogged;
    authState.user = parsed.user;

    updateUserMenu(authState);
    updateUserIcon(authState);
  } catch (error) {
    console.error('Failed to parse auth from localStorage');
    console.log(error);
  }
}

restoreAuth();
