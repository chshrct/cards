import { ThunkAction } from 'redux-thunk';

import { setUserId } from '../appReducer';

import { authAPI } from 'api';
import { RegisterData, UserDataResponseType, UserUpdateDataType } from 'api/authApi';
import { setError, setIsLoading } from 'App';
import { EMPTY_STRING } from 'constant';
import { AppRootActionType, AppRootStateType, ThunkApp, TypedDispatch } from 'store';

enum AUTH_ACTIONS {
  SET_AUTH = 'AUTH/SET_AUTH_USER_DATA',
  SET_USER_DATA = 'AUTH/SET_USER_DATA',
  EDIT_PROFILE = 'PROFILE/EDIT_USER',
  UNSUCCESSFUL_LOGIN = 'AUTH/UNSUCCESSFUL_LOGIN',
  SET_IS_EMAIL_SENT = 'AUTH/SET-IS-EMAIL-SENT',
}

type SetAuthUserData = ReturnType<typeof setAuthUserData>;
type SetUserData = ReturnType<typeof setUserData>;
type EditProfileType = ReturnType<typeof editProfile>;
type UnsuccessfulLoginType = ReturnType<typeof unsuccessfulLogin>;
type SetIsEmailSentType = ReturnType<typeof setIsEmailSent>;

export type AuthRootActionType =
  | SetUserData
  | SetAuthUserData
  | EditProfileType
  | UnsuccessfulLoginType
  | SetIsEmailSentType;

const initialState = {
  rememberMe: false,
  isAuth: false,
  error: EMPTY_STRING,
  isEmailSent: false,
  user: {
    _id: EMPTY_STRING,
    email: EMPTY_STRING,
    name: EMPTY_STRING,
    avatar: null,
    publicCardPacksCount: 0,

    created: {},
    updated: {},
    isAdmin: false,
    verified: false,
    rememberMe: false,

    error: EMPTY_STRING,
  } as UserDataResponseType,
};

export type AuthStateType = typeof initialState;

export const authReducer = (
  state: AuthStateType = initialState,
  { type, payload }: AuthRootActionType,
): AuthStateType => {
  switch (type) {
    case AUTH_ACTIONS.SET_AUTH:
    case AUTH_ACTIONS.SET_USER_DATA:
    case AUTH_ACTIONS.UNSUCCESSFUL_LOGIN:
      return { ...state, ...payload };
    case AUTH_ACTIONS.EDIT_PROFILE:
      return { ...state, user: { ...state.user, ...payload } };
    case AUTH_ACTIONS.SET_IS_EMAIL_SENT:
      return { ...state, ...payload };
    default:
      return state;
  }
};

// action
export const setUserData = (user: UserDataResponseType) =>
  ({
    type: AUTH_ACTIONS.SET_USER_DATA,
    payload: { user },
  } as const);
export const setAuthUserData = (email: string, rememberMe: boolean, isAuth: boolean) =>
  ({
    type: AUTH_ACTIONS.SET_AUTH,
    payload: { email, rememberMe, isAuth },
  } as const);

export const editProfile = (data: UserUpdateDataType) =>
  ({
    type: AUTH_ACTIONS.EDIT_PROFILE,
    payload: data,
  } as const);
export const unsuccessfulLogin = (error: string) =>
  ({
    type: AUTH_ACTIONS.UNSUCCESSFUL_LOGIN,
    payload: { error },
  } as const);

export const setIsEmailSent = (isEmailSent: boolean) =>
  ({
    type: AUTH_ACTIONS.SET_IS_EMAIL_SENT,
    payload: { isEmailSent },
  } as const);

// thunk
export const loginUser = (
  email: string,
  password: string,
  rememberMe: boolean,
): ThunkApp => {
  return dispatch => {
    dispatch(setIsLoading(true));
    authAPI
      .login({ email, password, rememberMe })
      .then(res => {
        dispatch(setAuthUserData(email, rememberMe, true));
        dispatch(setUserData(res.data));
        // eslint-disable-next-line no-underscore-dangle
        dispatch(setUserId(res.data._id));
      })
      .catch(e => {
        dispatch(setError(e.response.data.error));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const editUserData =
  (data: UserUpdateDataType): ThunkApp =>
  (dispatch: TypedDispatch) => {
    dispatch(setIsLoading(true));
    authAPI
      .editProfile(data)
      .then(res => dispatch(setUserData(res.data.updatedUser)))

      .catch(e => dispatch(setError(e.response.data.error)))

      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

export const logoutUser = (): ThunkApp => dispatch => {
  dispatch(setIsLoading(true));
  authAPI
    .logout()
    .then(() => {
      dispatch(setAuthUserData(EMPTY_STRING, false, false));
    })
    .catch(e => {
      dispatch(setError(e.response.data.error));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

export const setRegister =
  (data: RegisterData): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    authAPI
      .register(data)
      .then(res => {
        dispatch(setError(res.statusText));
      })
      .then(() => {
        dispatch(setError(EMPTY_STRING));
      })
      .catch(e => dispatch(setError(e.response.data.error)))
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

export const sendEmail =
  (email: string): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    authAPI
      .passRecover(email)
      .then(() => {
        dispatch(setIsEmailSent(true));
      })
      .catch(e => {
        dispatch(setError(e.response.data.error));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };

export const sendPassword =
  (
    password: string,
    token: string,
  ): ThunkAction<Promise<boolean | void>, AppRootStateType, unknown, AppRootActionType> =>
  dispatch => {
    dispatch(setIsLoading(true));
    return authAPI
      .setNewPassword({ password, resetPasswordToken: token! })
      .then(() => {
        return true;
      })
      .catch(e => {
        dispatch(setError(e.response.data.error));
      })
      .finally((redirectToLogin: boolean | void) => {
        dispatch(setIsLoading(false));
        if (redirectToLogin) return true;
        return false;
      });
  };
