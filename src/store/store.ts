import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { loginReducer } from '../pages/Login/loginReducer';
import {
  packsListReducer,
  PacksListRootActionType,
} from '../pages/PacksList/PacksListReducer';
import { profileReducer } from '../pages/Profile/profileReducer';
import { registrationReducer } from '../pages/Registration/registrationReducer';

import { appReducer, RootAppActionsType } from 'App/appReducer';
import {
  LoginRootActionType,
  ProfileRootActionType,
  RegistrationRootActionType,
} from 'pages';

const rootReducer = combineReducers({
  app: appReducer,
  login: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
  packs: packsListReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppRootActionType =
  | RegistrationRootActionType
  | ProfileRootActionType
  | LoginRootActionType
  | RootAppActionsType
  | PacksListRootActionType;
export type ThunkApp = ThunkAction<void, AppRootStateType, unknown, AppRootActionType>;
export type TypedDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionType>;

export const useAppDispatch = (): TypedDispatch => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppRootStateType = ReturnType<typeof store.getState>;
