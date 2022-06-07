import { packsApi, PacksResponseType } from '../../api/packsApi';

import { setError, setIsLoading } from 'App';
import { ThunkApp } from 'store';

enum PacksListActionsTypes {
  fetchPacks = 'PACKS-LIST/SET_ERROR',
  setIsAddNewPack = 'PACKS-LIST/SET_IS_ADD_NEW_PACK',
  setCurrentPage = 'PACKS-LIST/SET_CURRENT_PAGE',
  setTotalPacksCount = 'PACKS-LIST/SET_TOTAL_PACKS_COUNT',
  changeInputTitle = 'PACKS-LIST/CHANGE_INPUT_TITLE',
  sortPacks = 'PACKS-LIST/SORT_PACKS',
}

type FetchPacksType = ReturnType<typeof fetchPacksAC>;
type SetIsAddNewPackType = ReturnType<typeof setIsAddNewPack>;
type SetCurrentPageType = ReturnType<typeof setCurrentPage>;
type SetTotalPacksCountType = ReturnType<typeof setTotalPacksCount>;
type ChangeInputTitleType = ReturnType<typeof changeInputTitle>;
type SortPacksACType = ReturnType<typeof sortPacksAC>;

export type PacksListRootActionType =
  | FetchPacksType
  | SetIsAddNewPackType
  | SetCurrentPageType
  | SetTotalPacksCountType
  | ChangeInputTitleType
  | SortPacksACType;

const initialState = {
  packs: {} as PacksResponseType,
  isAddNewPack: false,
  paginator: {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    page: 1 as string | number,
    totalCount: 0,
    pageCount: 5,
    siblingCount: 1,
  },
  inputTitle: '',
  sortPacks: '0updated' as string | undefined,
};

type PacksListStateType = typeof initialState;

export const packsListReducer = (
  state: PacksListStateType = initialState,
  { type, payload }: PacksListRootActionType,
): PacksListStateType => {
  switch (type) {
    case PacksListActionsTypes.fetchPacks:
    case PacksListActionsTypes.setIsAddNewPack:
    case PacksListActionsTypes.changeInputTitle:
    case PacksListActionsTypes.sortPacks:
      return { ...state, ...payload };
    case PacksListActionsTypes.setCurrentPage:
    case PacksListActionsTypes.setTotalPacksCount:
      return { ...state, paginator: { ...state.paginator, ...payload } };
    default:
      return state;
  }
};

// action
export const fetchPacksAC = (packs: PacksResponseType) =>
  ({ type: PacksListActionsTypes.fetchPacks, payload: { packs } } as const);
export const setIsAddNewPack = (isAddNewPack: boolean) =>
  ({ type: PacksListActionsTypes.setIsAddNewPack, payload: { isAddNewPack } } as const);
export const setCurrentPage = (page: number | string) =>
  ({ type: PacksListActionsTypes.setCurrentPage, payload: { page } } as const);
export const setTotalPacksCount = (totalCount: number) =>
  ({ type: PacksListActionsTypes.setTotalPacksCount, payload: { totalCount } } as const);
export const changeInputTitle = (inputTitle: string) =>
  ({ type: PacksListActionsTypes.changeInputTitle, payload: { inputTitle } } as const);
export const sortPacksAC = (sortPacks: string | undefined) =>
  ({ type: PacksListActionsTypes.sortPacks, payload: { sortPacks } } as const);

// thunk
export const fetchPacks =
  (
    page: number | string,
    pageCount: number,
    inputTitle?: string,
    sortPacks?: string,
  ): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewPack(true));
    dispatch(setCurrentPage(page));
    packsApi
      .fetchPacks(page, pageCount, inputTitle, sortPacks)
      .then(data => {
        dispatch(fetchPacksAC(data));
        dispatch(setTotalPacksCount(data.cardPacksTotalCount));
        dispatch(sortPacksAC(sortPacks));
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

export const addNewPack = (): ThunkApp => (dispatch, getState) => {
  dispatch(setIsLoading(true));
  dispatch(setIsAddNewPack(true));
  packsApi
    .addPack()
    .then(() => {
      const { page, pageCount } = getState().packs.packs;
      dispatch(fetchPacks(page, pageCount));
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : `${e.message}, more details in the console`;
      dispatch(setError(error));
      dispatch(setIsLoading(false));
      dispatch(setIsAddNewPack(false));
    });
};

export const deletePacks =
  (id: string): ThunkApp =>
  (dispatch, getState) => {
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewPack(true));
    packsApi
      .deletePacks(id)
      .then(() => {
        const { page, pageCount } = getState().packs.packs;
        dispatch(fetchPacks(page, pageCount));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setError(error));
        dispatch(setIsLoading(false));
        dispatch(setIsAddNewPack(false));
      });
  };

export const updatePacks =
  (_id: string, name: string): ThunkApp =>
  (dispatch, getState) => {
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewPack(true));
    packsApi
      .updatePack(_id, name)
      .then(() => {
        const { page, pageCount } = getState().packs.packs;
        dispatch(fetchPacks(page, pageCount));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setError(error));
        dispatch(setIsLoading(false));
        dispatch(setIsAddNewPack(false));
      });
  };
