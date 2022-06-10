import { cardsAPI, CardsResponseType, NewCardData } from '../../../api/cardsApi';

import { setError, setIsLoading } from 'App';
import { EMPTY_STRING } from 'constant';
import { ThunkApp } from 'store';

enum CardsListActionsTypes {
  fetchCards = 'CARDS-LIST/FETCH_CARDS',
  sortCards = 'CARDS-LIST/SORT_CARDS',
  setIsAddNewCard = 'CARDS-LIST/SET_IS_ADD_NEW_CARD',
  setCurrentPage = 'CARDS-LIST/SET_CURRENT_PAGE',
  setTotalCardsCount = 'CARDS-LIST/SET_TOTAL_CARDS_COUNT',
  setCardQuestion = 'CARDS-LIST/SET-CARD_QUESTION',
  setCardAnswer = 'CARDS-LIST/SET-CARD_ANSWER',
  // changeInputTitle = 'PACKS-LIST/CHANGE_INPUT_TITLE',
  // toggleId = 'PACKS-LIST/TOGGLE_ID',
}

type FetchCardsACType = ReturnType<typeof fetchCardsAC>;
type SortCardsACType = ReturnType<typeof sortCardsAC>;
type SetIsAddNewCardType = ReturnType<typeof setIsAddNewCard>;
type SetCurrentPageType = ReturnType<typeof setCurrentPage>;
type SetTotalCardsCountType = ReturnType<typeof setTotalCardsCount>;
type SetCardQuestionType = ReturnType<typeof setCardQuestion>;
type SetCardAnswerType = ReturnType<typeof setCardAnswer>;

export type CardsListRootActionType =
  | FetchCardsACType
  | SortCardsACType
  | SetIsAddNewCardType
  | SetCurrentPageType
  | SetTotalCardsCountType
  | SetCardQuestionType
  | SetCardAnswerType;

const initialState = {
  cards: {} as CardsResponseType,
  isAddNewCard: false,
  paginator: {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    page: 1 as number | string,
    totalCount: 0,
    pageCount: 10,
    siblingCount: 1,
  },
  cardQuestion: EMPTY_STRING,
  cardAnswer: EMPTY_STRING,
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
    case CardsListActionsTypes.setCurrentPage:
    case CardsListActionsTypes.setTotalCardsCount:
      return { ...state, paginator: { ...state.paginator, ...payload } };
    case CardsListActionsTypes.setCardAnswer:
      return { ...state, ...payload };
    case CardsListActionsTypes.setCardQuestion:
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
export const setCurrentPage = (page: number | string) =>
  ({ type: CardsListActionsTypes.setCurrentPage, payload: { page } } as const);
export const setTotalCardsCount = (totalCount: number) =>
  ({ type: CardsListActionsTypes.setTotalCardsCount, payload: { totalCount } } as const);
export const setCardQuestion = (cardQuestion: string) =>
  ({
    type: CardsListActionsTypes.setCardQuestion,
    payload: { cardQuestion },
  } as const);
export const setCardAnswer = (cardAnswer: string) =>
  ({
    type: CardsListActionsTypes.setCardAnswer,
    payload: { cardAnswer },
  } as const);

// thunk
export const fetchCards =
  (
    // eslint-disable-next-line camelcase
    cardsPack_id: string | undefined,
    page: number | string,
    // min?: number,
    // max?: number,
    sortCards?: string | undefined,
    pageCount?: number,
    cardQuestion?: string,
    cardAnswer?: string,
  ): ThunkApp =>
  dispatch => {
    // const { isToggleAllId } = getState().packs;
    // const { userId } = getState().app;
    // eslint-disable-next-line camelcase,no-param-reassign
    // if (!isToggleAllId) user_id = userId;
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewCard(true));
    dispatch(setCurrentPage(page));
    cardsAPI
      // eslint-disable-next-line camelcase
      .fetchCards({ cardsPack_id, sortCards, page, pageCount, cardAnswer, cardQuestion })
      .then(data => {
        dispatch(fetchCardsAC(data));
        dispatch(setTotalCardsCount(data.cardsTotalCount));
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
  (dispatch, getState) => {
    const {
      sortCards,
      paginator: { page, pageCount },
    } = getState().cards;
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewCard(true));
    cardsAPI
      .addCard(payload)
      .then(data => {
        dispatch(fetchCards(data.newCard.cardsPack_id, page, sortCards, pageCount));
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
