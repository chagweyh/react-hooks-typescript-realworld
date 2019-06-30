import API, { TOKEN_KEY } from './APIUtils';
import { IUser } from '../types';
import { setLocalStorage } from '../utils';
import { setToken } from './APIUtils';

type User = {
  user: IUser & { token: string };
};

function handleUserResponse({ user: { token, ...user } }: User) {
  setLocalStorage(TOKEN_KEY, token);
  setToken(token);
  return user;
}

export function getCurrentUser() {
  return API.get<User>('/user');
}

export function login(email: string, password: string) {
  return API.post<User>('/users/login', {
    user: { email, password },
  }).then((user) => handleUserResponse(user.data));
}

export function register(user: {
  username: string;
  email: string;
  password: string;
}) {
  return API.post<User>('/users', { user }).then((user) =>
    handleUserResponse(user.data),
  );
}

export function updateUser(user: IUser & Partial<{ password: string }>) {
  return API.put<User>('/user', { user });
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setToken(null);
}
