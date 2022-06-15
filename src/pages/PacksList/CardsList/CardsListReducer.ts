/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import {
  UpdatedCardDataType,
  cardsAPI,
  CardsResponseType,
  CardType,
  NewCardData,
  UpdateCardGradeDataType,
} from '../../../api/cardsApi';

import { setError, setIsLoading } from 'App';
import { EMPTY_STRING, MAX_GRADE } from 'constant';
import { weightedRandom } from 'helpers';
import { ThunkApp } from 'store';

enum CardsListActionsTypes {
  fetchCards = 'CARDS-LIST/FETCH_CARDS',
  sortCards = 'CARDS-LIST/SORT_CARDS',
  setIsAddNewCard = 'CARDS-LIST/SET_IS_ADD_NEW_CARD',
  setCurrentPage = 'CARDS-LIST/SET_CURRENT_PAGE',
  setTotalCardsCount = 'CARDS-LIST/SET_TOTAL_CARDS_COUNT',
  setCardQuestion = 'CARDS-LIST/SET-CARD_QUESTION',
  setCardAnswer = 'CARDS-LIST/SET-CARD_ANSWER',
  setPageCount = 'CARDS-LIST/SET_PAGE_COUNT',
  setCardGradeAndShots = 'LEARN/SET_CARD_GRADE_AND_SHOTS',
  setCardToLearn = 'LEARN/SET_CARD_TO_LEARN',
}

type FetchCardsACType = ReturnType<typeof fetchCardsAC>;
type SortCardsACType = ReturnType<typeof sortCardsAC>;
type SetIsAddNewCardType = ReturnType<typeof setIsAddNewCard>;
type SetCurrentPageType = ReturnType<typeof setCurrentPage>;
type SetTotalCardsCountType = ReturnType<typeof setTotalCardsCount>;
type SetCardQuestionType = ReturnType<typeof setCardQuestion>;
type SetCardAnswerType = ReturnType<typeof setCardAnswer>;
type SetPageCountType = ReturnType<typeof setPageCount>;
type SetCardGradeAndShotsType = ReturnType<typeof setCardGradeAndShots>;
type SetCardToLearnType = ReturnType<typeof setCardToLearn>;

export type CardsListRootActionType =
  | FetchCardsACType
  | SortCardsACType
  | SetIsAddNewCardType
  | SetCurrentPageType
  | SetTotalCardsCountType
  | SetCardQuestionType
  | SetCardAnswerType
  | SetPageCountType
  | SetCardGradeAndShotsType
  | SetCardToLearnType;

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
  cardToLearn: null as null | CardType,
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
    case CardsListActionsTypes.setCardAnswer:
    case CardsListActionsTypes.setCardQuestion:
      return { ...state, ...payload };
    case CardsListActionsTypes.setCurrentPage:
    case CardsListActionsTypes.setTotalCardsCount:
    case CardsListActionsTypes.setPageCount:
      return { ...state, paginator: { ...state.paginator, ...payload } };
    case CardsListActionsTypes.setCardGradeAndShots:
      return {
        ...state,
        cards: {
          ...state.cards,
          cards: [
            ...state.cards.cards.map(card =>
              card._id === payload._id ? { ...card, ...payload } : card,
            ),
          ],
        },
      };
    case CardsListActionsTypes.setCardToLearn:
      return {
        ...state,
        cardToLearn: (() => {
          const { cards } = state.cards;
          const grades = cards.map(el => MAX_GRADE - el.grade);
          return weightedRandom<CardType>(cards, grades);
        })(),
      };
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
  ({ type: CardsListActionsTypes.setCardQuestion, payload: { cardQuestion } } as const);
export const setCardAnswer = (cardAnswer: string) =>
  ({ type: CardsListActionsTypes.setCardAnswer, payload: { cardAnswer } } as const);
export const setPageCount = (pageCount: number) =>
  ({ type: CardsListActionsTypes.setPageCount, payload: { pageCount } } as const);
export const setCardGradeAndShots = (payload: UpdateCardGradeDataEntityType) =>
  ({
    type: CardsListActionsTypes.setCardGradeAndShots,
    payload,
  } as const);
export const setCardToLearn = () =>
  ({
    type: CardsListActionsTypes.setCardToLearn,
    payload: null,
  } as const);

// thunk
export const fetchCards =
  (
    // eslint-disable-next-line camelcase
    cardsPack_id: string | undefined,
    page: number | string,

    pageCount: number,
    sortCards?: string | undefined,
    cardQuestion?: string,
    cardAnswer?: string,
  ): ThunkApp<Promise<boolean>> =>
  dispatch => {
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewCard(true));
    dispatch(setCurrentPage(page));
    dispatch(setPageCount(pageCount));
    return (
      cardsAPI
        // eslint-disable-next-line camelcase
        .fetchCards({
          cardsPack_id,
          sortCards,
          page,
          pageCount,
          cardAnswer,
          cardQuestion,
        })
        .then(data => {
          dispatch(fetchCardsAC(data));
          dispatch(setTotalCardsCount(data.cardsTotalCount));
          dispatch(sortCardsAC(sortCards));
          return true;
        })
        .catch(e => {
          const error = e.response
            ? e.response.data.error
            : `${e.message}, more details in the console`;
          dispatch(setError(error));
          return false;
        })
        .finally(() => {
          dispatch(setIsLoading(false));
          dispatch(setIsAddNewCard(false));
        })
    );
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
        dispatch(fetchCards(data.newCard.cardsPack_id, page, pageCount, sortCards));
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

export const deleteCard =
  (id: string): ThunkApp =>
  (dispatch, getState) => {
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewCard(true));
    cardsAPI
      .deleteCard(id)
      .then(() => {
        const { page, pageCount } = getState().cards.cards;
        // eslint-disable-next-line camelcase,@typescript-eslint/no-magic-numbers
        const { cardsPack_id } = getState().cards.cards.cards[0];
        dispatch(fetchCards(cardsPack_id, page, pageCount));
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

export const updateCard =
  (payload: UpdatedCardDataType): ThunkApp =>
  (dispatch, getState) => {
    dispatch(setIsLoading(true));
    dispatch(setIsAddNewCard(true));
    cardsAPI
      .updateCard(payload)
      .then(() => {
        const { page, pageCount } = getState().cards.cards;
        // eslint-disable-next-line camelcase,@typescript-eslint/no-magic-numbers
        const { cardsPack_id } = getState().cards.cards.cards[0];
        dispatch(fetchCards(cardsPack_id, page, pageCount));
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
export const updateCardGrade =
  (data: UpdateCardGradeDataType): ThunkApp =>
  dispatch => {
    dispatch(setIsLoading(true));
    cardsAPI
      .updateCardGrade(data)
      .then(resData => {
        dispatch(
          setCardGradeAndShots({
            _id: resData.card_id,
            grade: resData.grade,
            shots: resData.shots,
          }),
        );
      })
      .finally(() => dispatch(setIsLoading(false)));
  };

type UpdateCardGradeDataEntityType = { _id: string; grade: number; shots: number };
