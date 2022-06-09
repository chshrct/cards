import { cardsAPI, CardsResponseType, NewCardData } from '../../../api/cardsApi';

import { setError, setIsLoading } from 'App';
import { ThunkApp } from 'store';

enum CardsListActionsTypes {
  fetchCards = 'CARDS-LIST/FETCH_CARDS',
  sortCards = 'CARDS-LIST/SORT_CARDS',
  setIsAddNewCard = 'CARDS-LIST/SET_IS_ADD_NEW_CARD',
  // setCurrentPage = 'PACKS-LIST/SET_CURRENT_PAGE',
  // setTotalPacksCount = 'PACKS-LIST/SET_TOTAL_PACKS_COUNT',
  // changeInputTitle = 'PACKS-LIST/CHANGE_INPUT_TITLE',
  // toggleId = 'PACKS-LIST/TOGGLE_ID',
}

type FetchCardsACType = ReturnType<typeof fetchCardsAC>;
type SortCardsACType = ReturnType<typeof sortCardsAC>;
type SetIsAddNewCardType = ReturnType<typeof setIsAddNewCard>;

export type CardsListRootActionType =
  | FetchCardsACType
  | SortCardsACType
  | SetIsAddNewCardType;

const initialState = {
  cards: {} as CardsResponseType,
  isAddNewCard: false,
  // paginator: {
  //   // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  //   page: 1 as string | number,
  //   totalCount: 0,
  //   pageCount: 5,
  //   siblingCount: 1,
  // },
  sortCards: '0grade' as string | undefined,
};

type CardsListStateType = typeof initialState;

export const cardsListReducer = (
  state: CardsListStateType = initialState,
  { type, payload }: CardsListRootActionType,
): CardsListStateType => {
  switch (type) {
    case CardsListActionsTypes.fetchCards:
    case CardsListActionsTypes.sortCards:
    case CardsListActionsTypes.setIsAddNewCard:
      return { ...state, ...payload };
    default:
      return state;
  }
};

// action
export const fetchCardsAC = (cards: CardsResponseType) =>
  ({ type: CardsListActionsTypes.fetchCards, payload: { cards } } as const);
export const sortCardsAC = (sortCards: string | undefined) =>
  ({ type: CardsListActionsTypes.sortCards, payload: { sortCards } } as const);
export const setIsAddNewCard = (isAddNewCard: boolean) =>
  ({ type: CardsListActionsTypes.setIsAddNewCard, payload: { isAddNewCard } } as const);

// thunk
export const fetchCards =
  (
    // cardAnswer?: string,
    // cardQuestion?: string,
    // eslint-disable-next-line camelcase
    cardsPack_id: string | undefined,
    // min?: number,
    // max?: number,
    sortCards?: string,
    // page?: number,
    // pageCount?: number,
  ): ThunkApp =>
  dispatch => {
    // const { isToggleAllId } = getState().packs;
    // const { userId } = getState().app;
    // eslint-disable-next-line camelcase,no-param-reassign
    // if (!isToggleAllId) user_id = userId;
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewCard(true));
    // dispatch(setCurrentPage(page));
    cardsAPI
      // eslint-disable-next-line camelcase
      .fetchCards({ cardsPack_id, sortCards })
      .then(data => {
        dispatch(fetchCardsAC(data));
        // dispatch(setTotalPacksCount(data.cardPacksTotalCount));
        dispatch(sortCardsAC(sortCards));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
        dispatch(setIsAddNewCard(false));
      });
  };

export const addNewCard =
  (payload: NewCardData): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewCard(true));
    cardsAPI
      .addCard(payload)
      .then(data => {
        dispatch(fetchCards(data.newCard.cardsPack_id));
      })
      .catch(e => {
        const error = e.response
          ? e.response.data.error
          : `${e.message}, more details in the console`;
        dispatch(setError(error));
        dispatch(setIsLoading(false));
        dispatch(setIsAddNewCard(false));
      });
  };

// export const deletePacks =
//   (id: string): ThunkApp =>
//   (dispatch, getState) => {
//     dispatch(setIsLoading(true));
//     dispatch(setIsAddNewPack(true));
//     packsApi
//       .deletePacks(id)
//       .then(() => {
//         const { page, pageCount } = getState().packs.packs;
//         dispatch(fetchPacks(page, pageCount));
//       })
//       .catch(e => {
//         const error = e.response
//           ? e.response.data.error
//           : `${e.message}, more details in the console`;
//         dispatch(setError(error));
//         dispatch(setIsLoading(false));
//         dispatch(setIsAddNewPack(false));
//       });
//   };
//
// export const updatePacks =
//   (_id: string, name: string): ThunkApp =>
//   (dispatch, getState) => {
//     dispatch(setIsLoading(true));
//     dispatch(setIsAddNewPack(true));
//     packsApi
//       .updatePack(_id, name)
//       .then(() => {
//         const { page, pageCount } = getState().packs.packs;
//         dispatch(fetchPacks(page, pageCount));
//       })
//       .catch(e => {
//         const error = e.response
//           ? e.response.data.error
//           : `${e.message}, more details in the console`;
//         dispatch(setError(error));
//         dispatch(setIsLoading(false));
//         dispatch(setIsAddNewPack(false));
//       });
//   };
