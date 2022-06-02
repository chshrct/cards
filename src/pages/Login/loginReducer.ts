import { authAPI } from 'api';
import { UserDataResponseType } from 'api/authApi';
import { ThunkApp } from 'store';

enum LoginActionsTypes {
  setAuthUserData = 'LOGIN/SET_AUTH_USER_DATA',
  setUserData = 'LOGIN/SET_USER_DATA',
  setEmail = 'LOGIN/SET_EMAIL',
}

type SetAuthUserData = ReturnType<typeof setAuthUserData>;
type SetUserData = ReturnType<typeof setUserData>;

export type LoginRootActionType = SetUserData | SetAuthUserData;

const initialState = {
  rememberMe: false,
  isAuth: false,
  user: null as UserDataResponseType | null,
};

export type LoginStateType = typeof initialState;

export const loginReducer = (
  state: LoginStateType = initialState,
  action: LoginRootActionType,
): LoginStateType => {
  switch (action.type) {
    case LoginActionsTypes.setAuthUserData:
    case LoginActionsTypes.setUserData:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// action
export const setUserData = (user: UserDataResponseType) =>
  ({
    type: LoginActionsTypes.setUserData,
    payload: { user },
  } as const);
export const setAuthUserData = (email: string, rememberMe: boolean, isAuth: boolean) =>
  ({
    type: LoginActionsTypes.setAuthUserData,
    payload: { email, rememberMe, isAuth },
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
        console.log(JSON.stringify(res.data));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        console.log('Error: ', { ...error });
      });
  };
};
