import { packsApi, PacksResponseType } from '../../api/packsApi';

import { setIsLoading } from 'App';
import { EMPTY_STRING } from 'constant';
import { ThunkApp } from 'store';

enum PacksListActionsTypes {
  fetchPacks = 'PACKS-LIST/SET_ERROR',
  setError = 'PACKS-LIST/SET_ERROR',
}

type FetchPacksType = ReturnType<typeof fetchPacksAC>;
type SetErrorType = ReturnType<typeof setError>;

export type PacksListRootActionType = FetchPacksType | SetErrorType;

const initialState = {
  packs: {} as PacksResponseType,
  error: EMPTY_STRING,
};

type PacksListStateType = typeof initialState;

export const packsListReducer = (
  state: PacksListStateType = initialState,
  { type, payload }: PacksListRootActionType,
): PacksListStateType => {
  switch (type) {
    case PacksListActionsTypes.fetchPacks:
    case PacksListActionsTypes.setError:
      return { ...state, ...payload };
    default:
      return state;
  }
};

// action
export const fetchPacksAC = (packs: PacksResponseType) =>
  ({ type: PacksListActionsTypes.fetchPacks, payload: { packs } } as const);
export const setError = (error: string) =>
  ({ type: PacksListActionsTypes.setError, payload: { error } } as const);

// thunk

export const fetchPacks = (): ThunkApp => dispatch => {
  dispatch(setIsLoading(true));
  packsApi
    .fetchPacks()
    .then(data => {
      dispatch(fetchPacksAC(data));
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : `${e.message}, more details in the console`;
      dispatch(setError(error));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};

export const addNewPack = (): ThunkApp => dispatch => {
  dispatch(setIsLoading(true));
  packsApi
    .addPack()
    .then(() => {
      packsApi.fetchPacks();
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : `${e.message}, more details in the console`;
      dispatch(setError(error));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};
