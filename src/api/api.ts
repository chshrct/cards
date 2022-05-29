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

export const authAPI = {
  login(data: LoginData) {
    return instance.post("/auth/login", data);
  },
  logout() {
    return instance.delete("/auth/me");
  },
  register(data: Omit<LoginData, "rememberMe">) {
    return instance.post("/auth/register", data);
  },
  authMe() {
    return instance.post("/auth/me", {});
  },
  editProfile(data: ProfileData) {
    return instance.put("/auth/me", data);
  },
  passRecover(email: string) {
    return instance.post("/auth/forgot", { ...letter, email });
  },
  setNewPassword(data: PasswordResetData) {
    return instance.post("/auth/set-new-password", data);
  },
};
