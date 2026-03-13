import { authState } from '../api/auth';
import {openPopup, closeModal} from '../popup/popup-user';
import { UserAuth } from '../../types/user';

const userMenu = document.querySelector('.user-menu') as HTMLDivElement;
const userNameEl = userMenu?.querySelector('.user-menu-name') as HTMLSpanElement;
const userEmailEl = userMenu?.querySelector('.user-menu-email') as HTMLSpanElement;
const userIcon = document.querySelector('.user-icon') as HTMLElement | null;
const overlay = document.querySelector('.overlay') as HTMLElement | null;
const btnSignIn  = document.querySelector('.sign_in-btn') as HTMLElement | null;
const btnSignOut = document.querySelector('.sign_out-btn') as HTMLElement | null;
const loginPopup = document.querySelector('.login-popup') as HTMLElement | null;
const popupUser = document.querySelector('.popup-user') as HTMLElement | null;
const closeUserMenu = document.querySelector('.close-popup-user-menu') as HTMLElement | null;

closeUserMenu?.addEventListener('click', () => {
  if (!overlay || !userMenu || !userIcon) return;
  closeModal(overlay, userMenu);
})

btnSignIn?.addEventListener('click', () => {
  if (!overlay || !loginPopup) return;
  openPopup(overlay, loginPopup);
  popupUser?.classList.remove('active-modal');
})

btnSignOut?.addEventListener('click', () => {
  authState.isLogged = false;
  if (!overlay || !userMenu || !userIcon) return;
  closeModal(overlay, userMenu);
  updateUserMenu(authState);
  updateUserIcon(authState);
})


export function updateUserMenu(auth: UserAuth | null) {
  const userIconName = document.querySelector('.user-icon-name') as HTMLElement | null;

  if (!userNameEl || !userEmailEl || !userIconName) return;

  if (auth?.isLogged && auth.user) {
    userNameEl.textContent = auth.user.name;
    userEmailEl.textContent = auth.user.email;
    userIconName.textContent = auth.user.name;
  } else {
    userNameEl.textContent = '';
    userEmailEl.textContent = '';
    userIconName.textContent = '';
  }
}

export function updateUserIcon(auth: UserAuth | null) {
  const userIcon = document.querySelector('.user-icon') as HTMLElement | null;
  if (!userIcon) return;

  userIcon.style.backgroundImage = auth?.isLogged
    ? 'url("../../assets/icons/user-logged.png")'
    : 'url("../../assets/icons/user-in.png")';
}