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
        params: { id },
      })
      .then(res => res.data);
  },
  updateCard(payload: UpdatedCardDataType) {
    return instance
      .put<UpdatedCardDataType, AxiosResponse<UpdatedCardType>>('/cards/card/', payload)
      .then(res => res.data);
  },
  updateCardGrade(payload: UpdateCardGradeDataType) {
    return instance
      .put<UpdatedCardGradeType>('/cards/grade', payload)
      .then(res => res.data.updatedGrade);
  },
};

// types

export type CardsDataQuery = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string | undefined;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number | string;
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

export type NewCardData = {
  card: {
    cardsPack_id: string | undefined;
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

export type UpdatedCardDataType = {
  card: {
    _id: string;
    question?: string;
    answer?: string;
    comments?: string;
  };
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

export type UpdateCardGradeDataType = { card_id: string; grade: number };

type UpdatedCardGradeType = {
  token: string;
  tokenDeathTime: number;
  updatedGrade: {
    card_id: string;
    cardsPack_id: string;
    created: string;
    grade: number;
    more_id: string;
    shots: number;
    updated: string;
    user_id: string;
    __v: number;
    _id: string;
  };
};
