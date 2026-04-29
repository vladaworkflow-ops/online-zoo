import {
  validateLogin,
  validateUserName,
  validatePassword,
  validateConfirmPassword,
  validateEmail,
} from '../utils/validation';
import { authState, registerUser } from '../api/auth';
import { User } from '../../types/user';
import { BackendMessages } from '../utils/backendMessages';
import { updateUserIcon, updateUserMenu } from '../utils/user-menu';

const registerContainer = document.querySelector(
  '.registration-popup',
) as HTMLDivElement;
const form = document.getElementById('registration-form') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const loginInput = document.getElementById('login') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const passwordInput = document.getElementById('password') as HTMLInputElement;
const confirmPasswordInput = document.getElementById(
  'confirm-password',
) as HTMLInputElement;
const registerButton = document.querySelector(
  '.submit-registration-form',
) as HTMLButtonElement;
registerButton.disabled = true;

const nameError = document.getElementById('name-error') as HTMLDivElement;
const loginError = document.getElementById('login-error') as HTMLDivElement;
const emailError = document.getElementById('email-error') as HTMLDivElement;
const passwordError = document.getElementById(
  'password-error',
) as HTMLDivElement;
const confirmPasswordError = document.getElementById(
  'confirm-password-error',
) as HTMLDivElement;
const formErrorGlobal = document.getElementById(
  'form-error-global',
) as HTMLDivElement;
const overlay = document.querySelector('.overlay') as HTMLElement;

export function showError(
  input: HTMLInputElement,
  errorElement: HTMLDivElement,
  message: string,
) {
  input.classList.add('input-error');
  errorElement.textContent = message;
}

export function clearError(
  input: HTMLInputElement,
  errorElement: HTMLDivElement,
) {
  input.classList.remove('input-error');
  errorElement.textContent = '';
}

function checkFormValidity() {
  const nameValidation = validateUserName(nameInput.value);
  const loginValidation = validateLogin(loginInput.value);
  const emailValidation = validateEmail(emailInput.value);
  const passwordValidation = validatePassword(passwordInput.value);
  const confirmValidation = validateConfirmPassword(
    passwordInput.value,
    confirmPasswordInput.value,
  );

  registerButton.disabled = !!(
    nameValidation ||
    loginValidation ||
    emailValidation ||
    passwordValidation ||
    confirmValidation
  );
}

export function setupValidation(
  input: HTMLInputElement,
  errorElement: HTMLDivElement,
  validateFn: (value: string) => string | null,
  checkForm: () => void,
) {
  input.addEventListener('blur', () => {
    const error = validateFn(input.value);

    if (error) {
      showError(input, errorElement, error);
    } else {
      clearError(input, errorElement);
    }

    checkForm();
  });

  input.addEventListener('focus', () => {
    clearError(input, errorElement);
  });

  input.addEventListener('input', checkForm);
}

setupValidation(nameInput, nameError, validateUserName, checkFormValidity);
setupValidation(loginInput, loginError, validateLogin, checkFormValidity);
setupValidation(emailInput, emailError, validateEmail, checkFormValidity);
setupValidation(
  passwordInput,
  passwordError,
  validatePassword,
  checkFormValidity,
);

setupValidation(
  confirmPasswordInput,
  confirmPasswordError,
  () =>
    validateConfirmPassword(passwordInput.value, confirmPasswordInput.value),
  checkFormValidity,
);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (registerButton.disabled) return;

  try {
    const response = await registerUser({
      login: loginInput.value,
      password: passwordInput.value,
      name: nameInput.value,
      email: emailInput.value,
    } as User);

    const message =
      BackendMessages.registration[
        response.status as keyof typeof BackendMessages.registration
      ] || BackendMessages.registration.default;

    if (response.status === 201) {
      formErrorGlobal.textContent = message;
      authState.isLogged = true;
      authState.user = {
        name: nameInput.value,
        email: emailInput.value,
      };
      updateUserIcon(authState);
      updateUserMenu(authState);
      form.reset();
      registerContainer.classList.remove('active-modal');
      overlay.classList.remove('active-modal');
    } else {
      formErrorGlobal.textContent = message;
    }
  } catch (error) {
    formErrorGlobal.textContent = BackendMessages.registration.default;
    console.log(error);
  }
});
