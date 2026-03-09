const userIcon = document.querySelector('.user-icon') as HTMLElement | null;;
const userMenu = document.querySelector('.popup-user') as HTMLElement | null;;
const overlay = document.querySelector('.overlay') as HTMLElement | null;;
const closePopupBtn = document.querySelector('.close-popup-user') as HTMLElement | null;
const btnSignIn  = document.querySelector('.sign_in-btn') as HTMLElement | null;
const loginPopup = document.querySelector('.login-popup') as HTMLElement | null;
const registerBtn = document.querySelector('.registration-btn') as HTMLElement | null;
const registerPopup = document.querySelector('.registration-popup') as HTMLElement | null;

export function openPopup(overlay: HTMLElement, modal: HTMLElement) {
  overlay.classList.add('active-modal');
  modal.classList.add('active-modal');
}

export function closeModal(overlay: HTMLElement, modal: HTMLElement) {
  overlay.classList.remove('active-modal');
  modal.classList.remove('active-modal');
}

userIcon?.addEventListener('click', () => {
  if (!overlay || !userMenu) return;
  openPopup(overlay, userMenu);
})

closePopupBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!overlay || !userMenu) return;
  closeModal(overlay, userMenu);
})

overlay?.addEventListener('click', () => {
  if (!overlay || !userMenu || !loginPopup) return;
  closeModal(overlay, userMenu);

  if (loginPopup?.classList.contains('active-modal')) {
    loginPopup.classList.remove('active-modal');
  }

  if (registerPopup?.classList.contains('active-modal')) {
    registerPopup.classList.remove('active-modal');
  }
})

btnSignIn?.addEventListener('click', () => {
  if (!overlay || !loginPopup) return;
  openPopup(overlay, loginPopup);
  userMenu?.classList.remove('active-modal');
})

registerBtn?.addEventListener('click', () => {
  if (!overlay || !registerPopup) return;
  openPopup(overlay, registerPopup);

  userMenu?.classList.remove('active-modal');
})

console.log(closePopupBtn);