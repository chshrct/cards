import {authAPI} from '../../api/api';
import {ThunkApp} from '../../store/store';

enum LoginActionsTypes {
    setAuthUserData = 'LOGIN/SET_AUTH_USER_DATA',
    setUserData = 'LOGIN/SET_USER_DATA',
    setEmail = 'LOGIN/SET_EMAIL',
}

type UserDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

type SetAuthUserData = ReturnType<typeof setAuthUserData>;
type SetUserData = ReturnType<typeof setUserData>;
type SetEmail = ReturnType<typeof setEmail>;

export type LoginRootActionType = SetUserData | SetEmail | SetAuthUserData;

const initialState = {
    email: '',
    rememberMe: false,
    isAuth: false,
    user: null as UserDataType | null,
};

export type LoginStateType = typeof initialState

const loginReducer = (
    state: LoginStateType = initialState,
    action: LoginRootActionType
) => {
    switch (action.type) {
        case LoginActionsTypes.setEmail:
            return {...state, email: action.email};
        case LoginActionsTypes.setAuthUserData:
        case LoginActionsTypes.setUserData:
            return {...state, ...action.payload};
        default:
            return state;
    }
};

//action
export const setEmail = (email: string) =>
    ({
        type: LoginActionsTypes.setEmail,
        email,
    } as const);
export const setUserData = (payload: { user: UserDataType }) =>
    ({
        type: LoginActionsTypes.setUserData,
        payload,
    } as const);
export const setAuthUserData = (email: string, rememberMe: boolean, isAuth: boolean) => ({
    type: LoginActionsTypes.setAuthUserData,
    payload: {email, rememberMe, isAuth},
} as const);

const data = {
    email: 'nya-admin@nya.nya',
    password: '1qazxcvBG',
    rememberMe: false,
};

//thunk
export const setEmailTestThunk = (): ThunkApp => (dispatch) => {
    authAPI.login(data).then((res) => {
        dispatch(setEmail(res.data.email));
    });
};
export const login = (email: string, password: string, rememberMe: boolean): ThunkApp => {
    return (dispatch) => {
        authAPI.login({email, password, rememberMe})
            .then((res) => {
                dispatch(setAuthUserData(email, rememberMe, true));
                dispatch(setUserData(res.data));
                console.log(JSON.stringify(res.data));
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                console.log('Error: ', {...e});
            });
    };
};

export default loginReducer;
