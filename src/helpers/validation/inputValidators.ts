import { validationConstants } from 'constants/validation';

export const validateEmail = (email: string): string => {
  if (email === validationConstants.emptyString) {
    return '';
  }
  const emailRegExp =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegExp.test(email.toLowerCase()) ? '' : 'Некорректный email';
};

export const validatePassword = (password: string): string => {
  if (password === validationConstants.emptyString) {
    return '';
  }
  if (password.length <= validationConstants.maxPasswordLength) {
    return 'Password must be at least 8 characters long';
  }
  return '';
};
