import { authAPI } from 'api';
import { setAuthUserData } from 'pages/Login/loginReducer';
import { ThunkApp } from 'store';

enum AppActionsTypes {
  SET_IS_INITIALIZED = 'APP/SET-IS-INITIALIZED',
  SET_IS_LOADING = 'APP/SET-IS-LOADING',
}

type InitialStateType = {
  isInitialized: boolean;
  isLoading: boolean;
};

const initialState = {
  isInitialized: false,
  isLoading: false,
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
export type RootAppActionsType = SetisInitializedType | SetsetIsLoadingType;
