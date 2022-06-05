import { authAPI, RegisterData } from 'api';
import { setIsLoading } from 'App';
import { ThunkApp } from 'store';

enum RegistrationActionsTypes {
  setError = 'REGISTRATION/SET_ERROR',
}

type RegistrationStateType = typeof initialState;

type SetErrorType = ReturnType<typeof setError>;

export type RegistrationRootActionType = SetErrorType;

const initialState = {
  error: '',
};

export const registrationReducer = (
  state: RegistrationStateType = initialState,
  { type, payload }: RegistrationRootActionType,
): RegistrationStateType => {
  switch (type) {
    case RegistrationActionsTypes.setError:
      return { ...state, ...payload };
    default:
      return state;
  }
};

// action
export const setError = (error: string) =>
  ({ type: RegistrationActionsTypes.setError, payload: { error } } as const);

// thunk
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
        dispatch(setError(''));
      })
      .catch(e => dispatch(setError(e.response.data.error)))
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
