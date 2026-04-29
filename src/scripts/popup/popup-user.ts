import { authState } from '../api/auth';

const userIcon = document.querySelector('.user-icon') as HTMLElement | null;
const popupUser = document.querySelector('.popup-user') as HTMLElement | null;
export const userMenu = document.querySelector(
  '.user-menu',
) as HTMLElement | null;
const overlay = document.querySelector('.overlay') as HTMLElement | null;
const closePopupBtn = document.querySelector(
  '.close-popup-user',
) as HTMLElement | null;
const loginPopup = document.querySelector('.login-popup') as HTMLElement | null;
const registerPopup = document.querySelector(
  '.registration-popup',
) as HTMLElement | null;
const registerBtn = document.querySelector(
  '.registration-btn',
) as HTMLElement | null;

export function openPopup(overlay: HTMLElement, modal: HTMLElement) {
  overlay.classList.add('active-modal');
  modal.classList.add('active-modal');
}

export function closeModal(overlay: HTMLElement, modal: HTMLElement) {
  overlay.classList.remove('active-modal');
  modal.classList.remove('active-modal');
}

userIcon?.addEventListener('click', () => {
  if (!overlay) return;

  if (authState.isLogged) {
    if (!userMenu) return;
    openPopup(overlay, userMenu);
  } else {
    if (!popupUser) return;
    openPopup(overlay, popupUser);
  }
});

closePopupBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!overlay || !popupUser) return;
  closeModal(overlay, popupUser);
});

overlay?.addEventListener('click', () => {
  if (!overlay || !popupUser || !loginPopup) return;
  closeModal(overlay, popupUser);

  if (loginPopup?.classList.contains('active-modal')) {
    loginPopup.classList.remove('active-modal');
  }

  if (registerPopup?.classList.contains('active-modal')) {
    registerPopup.classList.remove('active-modal');
  }
});

registerBtn?.addEventListener('click', () => {
  if (!overlay || !registerPopup) return;
  openPopup(overlay, registerPopup);

  popupUser?.classList.remove('active-modal');
});
