import { packsApi, PacksResponseType } from '../../api/packsApi';
import { PAGE_ONE } from '../../constant';

import { setError, setIsLoading } from 'App';
import { ThunkApp } from 'store';

enum PacksListActionsTypes {
  fetchPacks = 'PACKS-LIST/FETCH_PACKS',
  setIsAddNewPack = 'PACKS-LIST/SET_IS_ADD_NEW_PACK',
  setCurrentPage = 'PACKS-LIST/SET_CURRENT_PAGE',
  setTotalPacksCount = 'PACKS-LIST/SET_TOTAL_PACKS_COUNT',
  changeInputTitle = 'PACKS-LIST/CHANGE_INPUT_TITLE',
  sortPacks = 'PACKS-LIST/SORT_PACKS',
  toggleId = 'PACKS-LIST/TOGGLE_ID',
  setMinCardsCount = 'PACK-LIST/SET_MIN_CARDS_COUNT',
  setMaxCardsCount = 'PACK-LIST/SET_MAX_CARDS_COUNT',
}

type FetchPacksType = ReturnType<typeof fetchPacksAC>;
type SetIsAddNewPackType = ReturnType<typeof setIsAddNewPack>;
type SetCurrentPageType = ReturnType<typeof setCurrentPage>;
type SetTotalPacksCountType = ReturnType<typeof setTotalPacksCount>;
type ChangeInputTitleType = ReturnType<typeof changeInputTitle>;
type SortPacksACType = ReturnType<typeof sortPacksAC>;
type ToggleIdType = ReturnType<typeof toggleId>;
type SetMinCardsCountType = ReturnType<typeof setMinCardsCount>;
type SetMaxCardsCountType = ReturnType<typeof setMaxCardsCount>;

export type PacksListRootActionType =
  | FetchPacksType
  | SetIsAddNewPackType
  | SetCurrentPageType
  | SetTotalPacksCountType
  | ChangeInputTitleType
  | SortPacksACType
  | ToggleIdType
  | SetMinCardsCountType
  | SetMaxCardsCountType;

const initialState = {
  packs: {} as PacksResponseType,
  isAddNewPack: false,
  paginator: {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    page: 1 as number | string,
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
    case PacksListActionsTypes.setIsAddNewPack:
    case PacksListActionsTypes.changeInputTitle:
    case PacksListActionsTypes.sortPacks:
    case PacksListActionsTypes.toggleId:
      return { ...state, ...payload };
    case PacksListActionsTypes.setCurrentPage:
    case PacksListActionsTypes.setTotalPacksCount:
      return { ...state, paginator: { ...state.paginator, ...payload } };
    case PacksListActionsTypes.setMinCardsCount: {
      return { ...state, ...payload };
    }
    case PacksListActionsTypes.setMaxCardsCount:
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
export const setCurrentPage = (page: number | string) =>
  ({ type: PacksListActionsTypes.setCurrentPage, payload: { page } } as const);
export const setTotalPacksCount = (totalCount: number) =>
  ({ type: PacksListActionsTypes.setTotalPacksCount, payload: { totalCount } } as const);
export const changeInputTitle = (inputTitle: string) =>
  ({ type: PacksListActionsTypes.changeInputTitle, payload: { inputTitle } } as const);
export const sortPacksAC = (sortPacks: string | undefined) =>
  ({ type: PacksListActionsTypes.sortPacks, payload: { sortPacks } } as const);
export const toggleId = (isToggleAllId: boolean) =>
  ({
    type: PacksListActionsTypes.toggleId,
    payload: { isToggleAllId },
  } as const);
export const setMinCardsCount = (minCardsCount: number) =>
  ({
    type: PacksListActionsTypes.setMinCardsCount,
    payload: { minCardsCount },
  } as const);
export const setMaxCardsCount = (maxCardsCount: number) =>
  ({
    type: PacksListActionsTypes.setMaxCardsCount,
    payload: { maxCardsCount },
  } as const);

// thunk
export const fetchPacks =
  (
    page: number | string,
    pageCount: number,
    inputTitle?: string,
    sortPacks?: string,
    // eslint-disable-next-line camelcase
    user_id?: string,
  ): ThunkApp =>
  (dispatch, getState) => {
    const { isToggleAllId, minCardsCount, maxCardsCount } = getState().packs;
    const { userId } = getState().app;
    // eslint-disable-next-line camelcase,no-param-reassign
    if (!isToggleAllId) user_id = userId;
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewPack(true));
    dispatch(setCurrentPage(page));
    packsApi
      .fetchPacks(
        page,
        pageCount,
        inputTitle,
        sortPacks,
        user_id,
        minCardsCount,
        maxCardsCount,
      )
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
      const { pageCount } = getState().packs.packs;
      dispatch(fetchPacks(PAGE_ONE, pageCount));
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
