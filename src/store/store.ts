import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { authReducer } from '../App/auth/authReducer';
import {
  cardsListReducer,
  CardsListRootActionType,
} from '../pages/PacksList/CardsList/CardsListReducer';
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
  cards: cardsListReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export type AppRootActionType =
  | RootAppActionsType
  | AuthRootActionType
  | PacksListRootActionType
  | CardsListRootActionType;

export type ThunkApp = ThunkAction<void, AppRootStateType, unknown, AppRootActionType>;
export type TypedDispatch = ThunkDispatch<AppRootStateType, unknown, AppRootActionType>;

export const useAppDispatch = (): TypedDispatch => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

export type AppRootStateType = ReturnType<typeof store.getState>;
