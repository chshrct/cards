import { authAPI } from 'api';
import { setAuthUserData } from 'pages/Login/loginReducer';
import { ThunkApp, TypedDispatch } from 'store';

enum APP_ACTIONS {
  IS_INITIALIZED = 'APP/IS_INITIALIZED_APP',
}

type AppStateType = {
  isInitialized: boolean;
};

export type AppRootActionType = ReturnType<typeof setInitializedApp>;

const initialState = {
  isInitialized: false,
};

export const appReducer = (
  state: AppStateType = initialState,
  { type, payload }: AppRootActionType,
): AppStateType => {
  switch (type) {
    case APP_ACTIONS.IS_INITIALIZED:
      return { ...state, isInitialized: payload.isInitialized };
    default:
      return state;
  }
};
export const setInitializedApp = (isInitialized: boolean) =>
  ({
    type: APP_ACTIONS.IS_INITIALIZED,
    payload: { isInitialized },
  } as const);

// thunk
export const initializeApp = (): ThunkApp => async (dispatch: TypedDispatch) => {
  try {
    const res = await authAPI.authMe();
    console.log(res.data);
    dispatch(setInitializedApp(true));
    dispatch(setAuthUserData(res.data.user.email, res.data.user.rememberMe, true));
  } catch (e) {
    console.log(e);
  }
};
