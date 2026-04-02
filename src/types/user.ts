export interface User {
  login: string;
  password: string;
  name: string;
  email: string;
}

export type LoginUser = Pick<User, 'login' | 'password'>;

export type UserAuth = {
  isLogged: boolean;
  user: {
    name: string;
    email: string;
  };
};

export interface Donation {
  animal: string;
  amount: string;
  recurring: boolean;
  date?: string;
  card?: string | null;
  saveCard: boolean;
}

export interface DonationsByUser {
  [email: string]: Donation[];
}
