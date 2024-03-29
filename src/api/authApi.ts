import { instance } from './apiCfg';

const letter = {
  from: 'test-front-admin <ai73a@yandex.by>',

  message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='https://chshrct.github.io/cards/#/password-create/$token$'>
link</a>
</div>`,
};

export const authAPI = {
  login(data: LoginData) {
    return instance.post<UserDataResponseType>('/auth/login', data);
  },
  logout() {
    return instance.delete<BackResponseType>('/auth/me');
  },
  register(data: RegisterData) {
    return instance.post<RegisterResponseType>('/auth/register', data);
  },
  authMe() {
    return instance.post<UserDataResponseType>('/auth/me', {});
  },
  editProfile(data: UserUpdateDataType) {
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

export type RegisterData = Omit<LoginData, 'rememberMe'>;

// export type ProfileData = {
//   name: string;
//   avatar: string;
// };

type PasswordResetData = {
  password: string;
  resetPasswordToken: string;
};

type BackResponseType = {
  info: string;
  error: string;
};

export type UserDataResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar: string | null;
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

export type UserUpdateDataType = {
  name?: string;
  avatar?: string | null;
};
