import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import loginReducer, { LoginRootActionType } from "../pages/Login/loginReducer";
import profileReducer, {
  ProfileRootActionType,
} from "../pages/Profile/profileReducer";
import registrationReducer, {
  RegistrationRootActionType,
} from "../pages/Registration/registrationReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  profile: profileReducer,
});
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
);

export type AppRootActionType =
  | RegistrationRootActionType
  | ProfileRootActionType
  | LoginRootActionType;
export type ThunkApp = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  AppRootActionType
>;
export type TypedDispatch = ThunkDispatch<
  AppRootStateType,
  unknown,
  AppRootActionType
>;

export const useAppDispatch = () => useDispatch<TypedDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

export type AppRootStateType = ReturnType<typeof store.getState>;
