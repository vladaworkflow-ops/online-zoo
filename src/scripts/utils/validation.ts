const passwordRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?]).{6,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const onlyEnRegex = /^[A-Za-z]/;
const loginRegex = /^[A-Za-z][A-Za-z]{2,}$/;
const specialCharRegex = /(?=.*[!@#$%^&*()_+\-=[\]{}|;:'",.<>/?])/;

export const ValidationErrorMessages = {
  username: {
    required: "Username is required",
    minLength: "Username must be at least 3 characters",
    invalidChars: "Username must contain only English letters",
  },
  login: {
     required: "Login is required",
     minLength: "Login must be at least 3 characters",
     invalidFormat: "Login must start with a letter and contain only English letters",
  },
  password: {
    required: "Password is required",
    minLength: "Password must be at least 6 characters",
    missingSpecial: "Password must contain at least 1 special character",
  },
  confirmPassword: {
    required: "Confirm Password is required",
    notMatch: "Passwords do not match",
  },
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email address",
  },
};

export function validateLogin(login: string): string | null {
  if (!login) return ValidationErrorMessages.login.required;
  if (login.length < 3) return ValidationErrorMessages.login.minLength;
  if (!loginRegex.test(login)) return ValidationErrorMessages.login.invalidFormat;
  return null;
}

export function validateUserName(name: string): string | null {
  if (!name) return ValidationErrorMessages.username.required;
  if (name.length < 3) return ValidationErrorMessages.username.minLength;
  if (!onlyEnRegex.test(name)) return ValidationErrorMessages.username.invalidChars;
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return ValidationErrorMessages.password.required;
  if (password.length < 6) return ValidationErrorMessages.password.minLength;
  if (!specialCharRegex.test(password)) return ValidationErrorMessages.password.missingSpecial;
  return null;
}

export function validateConfirmPassword(password: string, confirmPassword: string): string | null {
  if (!confirmPassword) return ValidationErrorMessages.confirmPassword.required;
  if (password !== confirmPassword) return ValidationErrorMessages.confirmPassword.notMatch;
  return null;
}

export function validateEmail(email: string): string | null {
  if(!email) return ValidationErrorMessages.email.required;
  if(!emailRegex.test(email)) return ValidationErrorMessages.email.invalid;
  return null;
}