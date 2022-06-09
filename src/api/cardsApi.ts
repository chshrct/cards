import { AxiosResponse } from 'axios';

import { instance } from './apiCfg';

export const cardsAPI = {
  fetchCards(payload?: CardsDataQuery) {
    return instance
      .get<CardsResponseType>('/cards/card/', { params: payload })
      .then(res => res.data);
  },
  addCard(payload: NewCardData) {
    return instance
      .post<NewCardData, AxiosResponse<NewCardType>>('/cards/card/', payload)
      .then(res => res.data);
  },
  deleteCard(id: string) {
    return instance
      .delete<string, AxiosResponse<RemovedCardType>>('/cards/card/', {
        params: id,
      })
      .then(res => res.data);
  },
  updateCard(payload: UpdatedCardDataType) {
    return instance
      .put<UpdatedCardType, AxiosResponse<UpdatedCardType>>('/cards/card/', payload)
      .then(res => res.data);
  },
};

// types

type CardsDataQuery = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string | undefined;
  min?: number;
  max?: number;
  sortCards?: number;
  page?: number;
  pageCount?: number;
};

export type CardsResponseType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  page: number;
  pageCount: number;
  packUserId: string;
};

export type CardType = {
  answer: string;
  question: string;
  cardsPack_id: string;
  grade: number;
  rating: number;
  shots: number;
  type: string;
  user_id: string;
  created: string;
  updated: string;
  __v: number;
  _id: string;
};

type NewCardData = {
  card: {
    cardsPack_id: string;
    question?: string;
    answer?: string;
    grade?: number;
    shots?: number;
    rating?: number;
    answerImg?: string;
    questionImg?: string;
    questionVideo?: string;
    answerVideo?: string;
    type?: string;
  };
};

type UpdatedCardDataType = {
  card: CardType;
};

type RemovedCardType = {
  deletedCard: CardType;
};

type UpdatedCardType = {
  updatedCard: CardType;
};

type NewCardType = {
  newCard: CardType;
};
