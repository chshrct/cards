import axios from "axios";

export const instance = axios.create({
  baseURL:
    process.env.REACT_APP_BACK_URL || "https://neko-back.herokuapp.com/2.0",
  withCredentials: true,
});

const letter = {
  // кому восстанавливать пароль
  from: "test-front-admin <ai73a@yandex.by>",
  // можно указать разработчика фронта)
  message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/password-create/$token$'>
link</a>
</div>`, // хтмп-письмо, вместо $token$ бэк вставит токен
};

export const authAPI = {
  login(data: LoginData) {
    return instance.post<ProfileResponseType>("/auth/login", data);
  },
  logout() {
    return instance.delete<BackResponseType>("/auth/me");
  },
  register(data: Omit<LoginData, "rememberMe">) {
    return instance.post<RegisterResponseType>("/auth/register", data);
  },
  authMe() {
    return instance.post<ProfileResponseType>("/auth/me", {});
  },
  editProfile(data: ProfileData) {
    return instance.put<EditResponseType>("/auth/me", data);
  },
  passRecover(email: string) {
    return instance.post<BackResponseType>("/auth/forgot", {
      ...letter,
      email,
    });
  },
  setNewPassword(data: PasswordResetData) {
    return instance.post<BackResponseType>("/auth/set-new-password", data);
  },
};

//types

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
  publicCardPacksCount: number; // количество колод

  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
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
