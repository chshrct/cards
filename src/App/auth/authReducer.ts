/* eslint-disable no-console */
import { authAPI } from 'api';
import { RegisterData, UserDataResponseType } from 'api/authApi';
import { setError, setIsLoading } from 'App';
import { EMPTY_STRING } from 'constant';
import { ThunkApp, TypedDispatch } from 'store';

enum AUTH_ACTIONS {
  SET_AUTH = 'AUTH/SET_AUTH_USER_DATA',
  SET_USER_DATA = 'AUTH/SET_USER_DATA',
  EDIT_PROFILE = 'PROFILE/EDIT_USER',
  UNSUCCESSFUL_LOGIN = 'AUTH/UNSUCCESSFUL_LOGIN',
}

type SetAuthUserData = ReturnType<typeof setAuthUserData>;
type SetUserData = ReturnType<typeof setUserData>;
type EditProfileType = ReturnType<typeof editProfile>;
type UnsuccessfulLoginType = ReturnType<typeof unsuccessfulLogin>;

export type AuthRootActionType =
  | SetUserData
  | SetAuthUserData
  | EditProfileType
  | UnsuccessfulLoginType;

const initialState = {
  rememberMe: false,
  isAuth: false,
  error: EMPTY_STRING,
  user: {
    _id: EMPTY_STRING,
    email: EMPTY_STRING,
    name: EMPTY_STRING,
    avatar: EMPTY_STRING,
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
      return { ...state, user: { ...payload } };
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

export const editProfile = (data: UserDataResponseType) =>
  ({
    type: AUTH_ACTIONS.EDIT_PROFILE,
    payload: data,
  } as const);
export const unsuccessfulLogin = (error: string) =>
  ({
    type: AUTH_ACTIONS.UNSUCCESSFUL_LOGIN,
    payload: { error },
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
        console.log(JSON.stringify(res.data));
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
  (data: UserDataResponseType): ThunkApp =>
  async (dispatch: TypedDispatch) => {
    dispatch(setIsLoading(true));
    try {
      const res = await authAPI.editProfile(data);
      dispatch(setUserData(res.data.updatedUser));
    } catch (e: any) {
      dispatch(setError(e.response.data.error));
    }
    dispatch(setIsLoading(false));
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
