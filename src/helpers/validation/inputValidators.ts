export const validateEmail = (email: string) => {
  if (email.length === 0) {
    return "";
  }
  const emailRegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegExp.test(email.toLowerCase()) ? "" : "Некорректный email";
};

export const validatePassword = (password: string) => {
  if (password.length === 0) {
    return "";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters long";
  }
  return "";
};
