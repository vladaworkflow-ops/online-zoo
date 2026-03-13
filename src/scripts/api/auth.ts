import { User, LoginUser, UserAuth } from "../../types/user";

export const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("API_URL is not defined");
}

export async function registerUser(data: User) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response;
}

export async function loginUser(data: LoginUser) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return response;
}

export const authState: UserAuth = {
  isLogged: false,
  user: {
    name: '',
    email: ''
  }
};