import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { authReducer } from '../App/auth/authReducer';
import {
  packsListReducer,
  PacksListRootActionType,
} from '../pages/PacksList/PacksListReducer';

import { AuthRootActionType } from 'App';
import { appReducer, RootAppActionsType } from 'App/appReducer';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsListReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppRootActionType =
  | AuthRootActionType
  | RootAppActionsType
  | PacksListRootActionType;
export type ThunkApp = ThunkAction<void, AppRootStateType, unknown, AppRootActionType>;
export type TypedDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionType>;

export const useAppDispatch = (): TypedDispatch => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppRootStateType = ReturnType<typeof store.getState>;
