import {ThunkApp} from '../../store/store';
import {authAPI, RegisterData} from '../../api/api';
import {AxiosError} from 'axios';

enum RegistrationActionsTypes {
    setError = 'REGISTER/SET=ERROR',
}

type RegistrationStateType = typeof initialState

type IncCounter = ReturnType<typeof setError>;

export type RegistrationRootActionType = IncCounter;

const initialState = {
    error: '',
};

const registrationReducer = (
    state: RegistrationStateType = initialState,
    {type, payload}: RegistrationRootActionType
) => {
    switch (type) {
        case RegistrationActionsTypes.setError:
            return {...state, ...payload}
        default:
            return state;
    }
};

//action
export const setError = ( error: string ) =>
    ({type: RegistrationActionsTypes.setError, payload: {error},} as const);

export default registrationReducer;


//thunk
export const setRegister = (data: RegisterData): ThunkApp => (dispatch) => {
    authAPI.register(data)
        .then((res) => {
            dispatch(setError(res.statusText))
        })
        .then(res => dispatch(setError('')))
        .catch((e) => {
            dispatch(setError(e.response.data.error))
        })
};

