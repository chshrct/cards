import { authAPI } from 'api';
import { setAuthUserData } from 'App/auth/authReducer';
import { EMPTY_STRING } from 'constant';
import { ThunkApp } from 'store';

enum AppActionsTypes {
  SET_IS_INITIALIZED = 'APP/SET-IS-INITIALIZED',
  SET_IS_LOADING = 'APP/SET-IS-LOADING',
  SET_ERROR = 'APP/SET-ERROR',
}

type InitialStateType = {
  isInitialized: boolean;
  isLoading: boolean;
  error: string;
};

const initialState = {
  isInitialized: false,
  isLoading: false,
  error: EMPTY_STRING,
};

export const appReducer = (
  state = initialState,
  { type, payload }: RootAppActionsType,
): InitialStateType => {
  switch (type) {
    case AppActionsTypes.SET_IS_INITIALIZED:
      return { ...state, ...payload };
    case AppActionsTypes.SET_IS_LOADING:
      return { ...state, ...payload };
    case AppActionsTypes.SET_ERROR:
      return { ...state, ...payload };

    default:
      return state;
  }
};

// actions
export const setisInitialized = (isInitialized: boolean) =>
  ({
    type: AppActionsTypes.SET_IS_INITIALIZED,
    payload: { isInitialized },
  } as const);

export const setIsLoading = (isLoading: boolean) =>
  ({
    type: AppActionsTypes.SET_IS_LOADING,
    payload: { isLoading },
  } as const);

export const setError = (error: string) =>
  ({
    type: AppActionsTypes.SET_ERROR,
    payload: { error },
  } as const);

// thunks
export const initializeApp = (): ThunkApp => dispatch => {
  dispatch(setIsLoading(true));
  authAPI
    .authMe()
    .then(res => {
      dispatch(setAuthUserData(res.data.email, res.data.rememberMe, true));
    })
    .finally(() => {
      dispatch(setisInitialized(true));
      dispatch(setIsLoading(false));
    });
};

// types
type SetisInitializedType = ReturnType<typeof setisInitialized>;
type SetsetIsLoadingType = ReturnType<typeof setIsLoading>;
type SetErrorType = ReturnType<typeof setError>;
export type RootAppActionsType =
  | SetisInitializedType
  | SetsetIsLoadingType
  | SetErrorType;
