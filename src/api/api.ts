import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BACK_URL || process.env.REACT_APP_BACK_REMOTE_URL, // if u run local backend process.env.REACT_APP_BACK_LOCAL_URL
  withCredentials: true,
});

const letter = {
  from: 'test-front-admin <ai73a@yandex.by>',

  message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/password-create/$token$'>
link</a>
</div>`,
};

export const authAPI = {
  login(data: LoginData) {
    return instance.post<ProfileResponseType>('/auth/login', data);
  },
  logout() {
    return instance.delete<BackResponseType>('/auth/me');
  },
  register(data: Omit<LoginData, 'rememberMe'>) {
    return instance.post<RegisterResponseType>('/auth/register', data);
  },
  authMe() {
    return instance.post<ProfileResponseType>('/auth/me', {});
  },
  editProfile(data: ProfileData) {
    return instance.put<EditResponseType>('/auth/me', data);
  },
  passRecover(email: string) {
    return instance.post<BackResponseType>('/auth/forgot', {
      ...letter,
      email,
    });
  },
  setNewPassword(data: PasswordResetData) {
    return instance.post<BackResponseType>('/auth/set-new-password', data);
  },
};

// types

type LoginData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type ProfileData = {
  name: string;
  avatar: string;
};
type PasswordResetData = {
  password: string;
  resetPasswordToken: string;
};

type BackResponseType = {
  info: string;
  error: string;
};

type ProfileResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;

  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;

  error?: string;
};

type RegisterResponseType = {
  addedUser: any;
  error?: string;
};

type EditResponseType = {
  updatedUser: any;
  error?: string;
};
