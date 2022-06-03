/* eslint-disable no-console */
import { authAPI } from 'api';
import { UserDataResponseType } from 'api/authApi';
import { ThunkApp, TypedDispatch } from 'store';

enum LOGIN_ACTIONS {
  SET_AUTH = 'LOGIN/SET_AUTH_USER_DATA',
  SET_USER_DATA = 'LOGIN/SET_USER_DATA',
  EDIT_PROFILE = 'PROFILE/EDIT_USER',
  UNSUCCESSFUL_LOGIN = 'LOGIN/UNSUCCESSFUL_LOGIN',
}

type SetAuthUserData = ReturnType<typeof setAuthUserData>;
type SetUserData = ReturnType<typeof setUserData>;
type EditProfileType = ReturnType<typeof editProfile>;
type UnsuccessfulLoginType = ReturnType<typeof unsuccessfulLogin>;

export type LoginRootActionType =
  | SetUserData
  | SetAuthUserData
  | EditProfileType
  | UnsuccessfulLoginType;

const initialState = {
  rememberMe: false,
  isAuth: false,
  error: '',
  user: {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0,

    created: {},
    updated: {},
    isAdmin: false,
    verified: false,
    rememberMe: false,

    error: '',
  } as UserDataResponseType,
};

export type LoginStateType = typeof initialState;

export const loginReducer = (
  state: LoginStateType = initialState,
  { type, payload }: LoginRootActionType,
): LoginStateType => {
  switch (type) {
    case LOGIN_ACTIONS.SET_AUTH:
    case LOGIN_ACTIONS.SET_USER_DATA:
    case LOGIN_ACTIONS.UNSUCCESSFUL_LOGIN:
      return { ...state, ...payload };
    case LOGIN_ACTIONS.EDIT_PROFILE:
      return { ...state, user: { ...payload } };
    default:
      return state;
  }
};

// action
export const setUserData = (user: UserDataResponseType) =>
  ({
    type: LOGIN_ACTIONS.SET_USER_DATA,
    payload: { user },
  } as const);
export const setAuthUserData = (email: string, rememberMe: boolean, isAuth: boolean) =>
  ({
    type: LOGIN_ACTIONS.SET_AUTH,
    payload: { email, rememberMe, isAuth },
  } as const);

export const editProfile = (data: UserDataResponseType) =>
  ({
    type: LOGIN_ACTIONS.EDIT_PROFILE,
    payload: data,
  } as const);
export const unsuccessfulLogin = (error: string) =>
  ({
    type: LOGIN_ACTIONS.UNSUCCESSFUL_LOGIN,
    payload: { error },
  } as const);
// thunk
export const loginUser = (
  email: string,
  password: string,
  rememberMe: boolean,
): ThunkApp => {
  return dispatch => {
    authAPI
      .login({ email, password, rememberMe })
      .then(res => {
        dispatch(setAuthUserData(email, rememberMe, true));
        dispatch(setUserData(res.data));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        console.log('Error: ', { ...e });
        dispatch(unsuccessfulLogin(error));
      });
  };
};

export const editUserData =
  (data: UserDataResponseType): any =>
  async (dispatch: TypedDispatch) => {
    try {
      const res = await authAPI.editProfile(data);
      dispatch(setUserData(res.data.updatedUser));
    } catch (e) {
      console.log(e);
    }
  };

export const logoutUser = (): ThunkApp => dispatch => {
  authAPI.logout().then(() => {
    dispatch(setAuthUserData('', false, false));
  });
};
