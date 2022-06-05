import { packsApi, PacksResponseType } from '../../api/packsApi';

import { setError, setIsLoading } from 'App';
import { ThunkApp } from 'store';

enum PacksListActionsTypes {
  fetchPacks = 'PACKS-LIST/SET_ERROR',
  setIsAddNewPack = 'PACKS-LIST/SET_IS_ADD_NEW_PACK',
}

type FetchPacksType = ReturnType<typeof fetchPacksAC>;
type SetIsAddNewPackType = ReturnType<typeof setIsAddNewPack>;

export type PacksListRootActionType = FetchPacksType | SetIsAddNewPackType;

const initialState = {
  packs: {} as PacksResponseType,
  isAddNewPack: false,
};

type PacksListStateType = typeof initialState;

export const packsListReducer = (
  state: PacksListStateType = initialState,
  { type, payload }: PacksListRootActionType,
): PacksListStateType => {
  switch (type) {
    case PacksListActionsTypes.fetchPacks:
    case PacksListActionsTypes.setIsAddNewPack:
      return { ...state, ...payload };
    default:
      return state;
  }
};

// action
export const fetchPacksAC = (packs: PacksResponseType) =>
  ({ type: PacksListActionsTypes.fetchPacks, payload: { packs } } as const);
export const setIsAddNewPack = (isAddNewPack: boolean) =>
  ({ type: PacksListActionsTypes.setIsAddNewPack, payload: { isAddNewPack } } as const);

// thunk
export const fetchPacks = (): ThunkApp => dispatch => {
  dispatch(setIsLoading(true));
  dispatch(setIsAddNewPack(true));
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
      dispatch(setIsAddNewPack(false));
    });
};

export const addNewPack = (): ThunkApp => dispatch => {
  dispatch(setIsLoading(true));
  dispatch(setIsAddNewPack(true));
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
      dispatch(setIsAddNewPack(false));
    });
};

export const deletePacks =
  (id: string): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewPack(true));
    packsApi
      .deletePacks(id)
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
        dispatch(setIsAddNewPack(false));
      });
  };

export const updatePacks =
  (_id: string, name: string): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewPack(true));
    packsApi
      .updatePack(_id, name)
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
        dispatch(setIsAddNewPack(false));
      });
  };
