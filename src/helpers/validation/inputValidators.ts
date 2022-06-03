import { EMPTY_STRING, MAX_PASSWORD_LENGTH } from 'constant';

export const validateEmail = (email: string): string => {
  if (email === EMPTY_STRING) {
    return 'Required';
  }
  const emailRegExp =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegExp.test(email.toLowerCase()) ? '' : 'Некорректный email';
};

export const validatePassword = (password: string): string => {
  if (password === EMPTY_STRING) {
    return 'Required';
  }
  if (password.length <= MAX_PASSWORD_LENGTH) {
    return 'Password must be at least 8 characters long';
  }
  return '';
};
