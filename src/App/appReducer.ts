import { authAPI } from 'api';
import { setAuthUserData } from 'pages/Login/loginReducer';
import { ThunkApp } from 'store';

enum AppActionsTypes {
  SET_IS_INITIALIZED = 'APP/SET-IS-INITIALIZED',
}

type InitialStateType = {
  isInitialized: boolean;
};

const initialState = {
  isInitialized: false,
};

export const appReducer = (
  state = initialState,
  { type, payload }: RootAppActionsType,
): InitialStateType => {
  switch (type) {
    case AppActionsTypes.SET_IS_INITIALIZED:
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

// thunks
export const initializeApp = (): ThunkApp => dispatch => {
  authAPI
    .authMe()
    .then(res => {
      dispatch(setAuthUserData(res.data.email, res.data.rememberMe, true));
    })
    .finally(() => {
      dispatch(setisInitialized(true));
    });
};

// types
type SetisInitializedType = ReturnType<typeof setisInitialized>;
export type RootAppActionsType = SetisInitializedType;
