import { authAPI } from '../../api/authApi';
import { ThunkApp } from '../../store/store';

enum LoginActionsTypes {
  incCounter = 'LOGIN/INCREASE_COUNTER',
  setEmail = 'LOGIN/SET_EMAIL',
}

type LoginStateType = {
  count: number;
  email: string;
};

type IncCounterLogin = ReturnType<typeof incCounterLogin>;
type SetEmail = ReturnType<typeof setEmail>;

export type LoginRootActionType = IncCounterLogin | SetEmail;

const initialState = {
  count: 0,
  email: '',
};

export const loginReducer = (
  state: LoginStateType = initialState,
  action: LoginRootActionType,
): LoginStateType => {
  switch (action.type) {
    case LoginActionsTypes.incCounter:
      return { ...state, count: state.count + action.payload.count };
    case LoginActionsTypes.setEmail:
      return { ...state, email: action.email };

    default:
      return state;
  }
};

// action
export const incCounterLogin = (payload: { count: number }) =>
  ({
    type: LoginActionsTypes.incCounter,
    payload,
  } as const);
export const setEmail = (email: string) =>
  ({
    type: LoginActionsTypes.setEmail,
    email,
  } as const);

const data = {
  email: 'nya-admin@nya.nya',
  password: '1qazxcvBG',
  rememberMe: false,
};

// thunk
export const setEmailTestThunk = (): ThunkApp => dispatch => {
  authAPI.login(data).then(res => {
    dispatch(setEmail(res.data.email));
  });
};
