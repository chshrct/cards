/* eslint-disable camelcase,no-param-reassign */
import { packsApi, PacksDataQuery, PacksResponseType } from '../../api/packsApi';
import { ONE } from '../../constant';

import { setError, setIsLoading } from 'App';
import { ThunkApp } from 'store';

enum PacksListActionsTypes {
  fetchPacks = 'PACKS-LIST/FETCH_PACKS',
  setCurrentPage = 'PACKS-LIST/SET_CURRENT_PAGE',
  setTotalPacksCount = 'PACKS-LIST/SET_TOTAL_PACKS_COUNT',
  changeInputTitle = 'PACKS-LIST/CHANGE_INPUT_TITLE',
  sortPacks = 'PACKS-LIST/SORT_PACKS',
  toggleId = 'PACKS-LIST/TOGGLE_ID',
  setMinCardsCount = 'PACK-LIST/SET_MIN_CARDS_COUNT',
  setMaxCardsCount = 'PACK-LIST/SET_MAX_CARDS_COUNT',
  setPageCount = 'PACK-LIST/SET_PAGE_COUNT',
}

type FetchPacksType = ReturnType<typeof fetchPacksAC>;
type SetCurrentPageType = ReturnType<typeof setCurrentPage>;
type SetTotalPacksCountType = ReturnType<typeof setTotalPacksCount>;
type ChangeInputTitleType = ReturnType<typeof changeInputTitle>;
type SortPacksACType = ReturnType<typeof sortPacksAC>;
type ToggleIdType = ReturnType<typeof toggleId>;
type SetMinCardsCountType = ReturnType<typeof setMinCardsCount>;
type SetMaxCardsCountType = ReturnType<typeof setMaxCardsCount>;
type SetPageCountCountType = ReturnType<typeof setPageCount>;

export type PacksListRootActionType =
  | FetchPacksType
  | SetCurrentPageType
  | SetTotalPacksCountType
  | ChangeInputTitleType
  | SortPacksACType
  | ToggleIdType
  | SetMinCardsCountType
  | SetMaxCardsCountType
  | SetPageCountCountType;

const initialState = {
  packs: {} as PacksResponseType,
  paginator: {
    page: ONE as number | string,
    totalCount: 0,
    pageCount: 10,
    siblingCount: 1,
  },
  minCardsCount: 0,
  maxCardsCount: 150,
  inputTitle: '',
  sortPacks: '0updated' as string | undefined,
  isToggleAllId: true,
};

type PacksListStateType = typeof initialState;

export const packsListReducer = (
  state: PacksListStateType = initialState,
  { type, payload }: PacksListRootActionType,
): PacksListStateType => {
  switch (type) {
    case PacksListActionsTypes.fetchPacks:
    case PacksListActionsTypes.changeInputTitle:
    case PacksListActionsTypes.sortPacks:
    case PacksListActionsTypes.toggleId:
    case PacksListActionsTypes.setMinCardsCount:
    case PacksListActionsTypes.setMaxCardsCount:
      return { ...state, ...payload };
    case PacksListActionsTypes.setCurrentPage:
    case PacksListActionsTypes.setTotalPacksCount:
    case PacksListActionsTypes.setPageCount:
      return { ...state, paginator: { ...state.paginator, ...payload } };
    default:
      return state;
  }
};

// action
export const fetchPacksAC = (packs: PacksResponseType) =>
  ({ type: PacksListActionsTypes.fetchPacks, payload: { packs } } as const);
export const setCurrentPage = (page: number | string) =>
  ({ type: PacksListActionsTypes.setCurrentPage, payload: { page } } as const);
export const setTotalPacksCount = (totalCount: number) =>
  ({ type: PacksListActionsTypes.setTotalPacksCount, payload: { totalCount } } as const);
export const changeInputTitle = (inputTitle: string) =>
  ({ type: PacksListActionsTypes.changeInputTitle, payload: { inputTitle } } as const);
export const sortPacksAC = (sortPacks: string | undefined) =>
  ({ type: PacksListActionsTypes.sortPacks, payload: { sortPacks } } as const);
export const toggleId = (isToggleAllId: boolean) =>
  ({ type: PacksListActionsTypes.toggleId, payload: { isToggleAllId } } as const);
export const setMinCardsCount = (minCardsCount: number) =>
  ({ type: PacksListActionsTypes.setMinCardsCount, payload: { minCardsCount } } as const);
export const setMaxCardsCount = (maxCardsCount: number) =>
  ({ type: PacksListActionsTypes.setMaxCardsCount, payload: { maxCardsCount } } as const);
export const setPageCount = (pageCount: number) =>
  ({ type: PacksListActionsTypes.setPageCount, payload: { pageCount } } as const);

// thunk
export const fetchPacks =
  (payload: PacksDataQuery): ThunkApp =>
  (dispatch, getState) => {
    const { packName, sortPacks, page, pageCount, min, max } = payload;
    const { isToggleAllId } = getState().packs;

    if (!sortPacks) payload.sortPacks = getState().packs.sortPacks;
    if (!min) payload.min = getState().packs.minCardsCount;
    if (!max) payload.max = getState().packs.maxCardsCount;
    if (!packName) payload.packName = getState().packs.inputTitle;
    if (!page) payload.page = getState().packs.paginator.page;
    if (!pageCount) payload.pageCount = getState().packs.paginator.pageCount;

    const { userId } = getState().app;
    if (!isToggleAllId) payload.user_id = userId;

    dispatch(setIsLoading(true));
    dispatch(setCurrentPage(payload.page!));
    dispatch(setPageCount(payload.pageCount!));
    packsApi
      .fetchPacks(payload)
      .then(data => {
        dispatch(fetchPacksAC(data));
        dispatch(setTotalPacksCount(data.cardPacksTotalCount));
        dispatch(sortPacksAC(payload.sortPacks));
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

export const addNewPack =
  (newPackTitle: string): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    packsApi
      .addPack(newPackTitle)
      .then(() => {
        dispatch(fetchPacks({ page: ONE }));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setError(error));
        dispatch(setIsLoading(false));
      });
  };

export const deletePacks =
  (id: string): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    packsApi
      .deletePacks(id)
      .then(() => {
        dispatch(fetchPacks({}));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setError(error));
        dispatch(setIsLoading(false));
      });
  };

export const updatePacks =
  (_id: string, name: string): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    packsApi
      .updatePack(_id, name)
      .then(() => {
        dispatch(fetchPacks({}));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setError(error));
        dispatch(setIsLoading(false));
      });
  };
