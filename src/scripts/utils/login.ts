import { loginUser } from '../api/auth';
import { LoginUser } from '../../types/user';
import { setupValidation } from './registration';
import { authState } from '../api/auth';
import { validateLogin, validatePassword } from '../utils/validation';
import { BackendMessages } from '../utils/backendMessages';
import { updateUserMenu, updateUserIcon } from './user-menu';
import { getDonations, renderDonations } from '../components/renderDonation';

const loginContainer = document.querySelector('.login-popup') as HTMLDivElement;
const form = document.getElementById('form-login') as HTMLFormElement;
const loginInput = document.getElementById('log-in') as HTMLInputElement;
const passwordInput = document.getElementById(
  'password-login',
) as HTMLInputElement;
const loginButton = document.querySelector(
  '.submit-login-form',
) as HTMLButtonElement;
loginButton.disabled = true;

const loginError = document.getElementById('log-in-error') as HTMLDivElement;
const passwordError = document.getElementById(
  'password-error-login',
) as HTMLDivElement;
const formErrorGlobal = document.querySelector(
  '.form-login-error-global',
) as HTMLDivElement;
const overlay = document.querySelector('.overlay') as HTMLElement;

function checkFormLoginValidity() {
  const loginValidation = validateLogin(loginInput.value);
  const passwordValidation = validatePassword(passwordInput.value);

  loginButton.disabled = !!(loginValidation || passwordValidation);
}

setupValidation(loginInput, loginError, validateLogin, checkFormLoginValidity);
setupValidation(
  passwordInput,
  passwordError,
  validatePassword,
  checkFormLoginValidity,
);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (loginButton.disabled) return;

  try {
    const response = await loginUser({
      login: loginInput.value,
      password: passwordInput.value,
    } as LoginUser);

    const responseData = await response.json();

    const message =
      BackendMessages.login[
        response.status as keyof typeof BackendMessages.login
      ] || BackendMessages.login.default;

    if (response.status === 200) {
      const { user } = responseData.data;

      authState.isLogged = true;
      authState.user = {
        name: user.name,
        email: user.email,
      };

      localStorage.setItem('auth', JSON.stringify(authState));

      formErrorGlobal.textContent = message;

      updateUserMenu(authState);
      updateUserIcon(authState);
      let userDonations = getDonations(authState.user.email);
      renderDonations(userDonations);

      form.reset();
      loginContainer.classList.remove('active-modal');
      overlay.classList.remove('active-modal');
    } else {
      formErrorGlobal.textContent = message;
    }
  } catch (error) {
    formErrorGlobal.textContent = BackendMessages.registration.default;
    console.log(error);
  }
});
