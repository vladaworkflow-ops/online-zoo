export interface User {
  login: string;
  password: string;
  name: string;
  email: string;
};

export type LoginUser = Pick<User, 'login' | 'password'>;

export type UserAuth = {
  isLogged: boolean,
  user: {
    name: string,
    email: string
  } | null
}