/* eslint-disable camelcase */
import { instance } from './apiCfg';

/* const cardsPack = {
  name: 'no Name',
  deckCover: 'url or base64',
  private: false,
}; */

export const packsApi = {
  fetchPacks(payload: PacksDataQuery) {
    return instance
      .get<PacksResponseType>('/cards/pack', { params: payload })
      .then(res => res.data);
  },
  addPack(name: string) {
    return instance
      .post<PackResponseType>('/cards/pack', { cardsPack: { name } })
      .then(res => res.data);
  },
  deletePacks(id: string) {
    return instance
      .delete<PackResponseType>('/cards/pack', { params: { id } })
      .then(res => res.data);
  },
  updatePack(_id: string, name: string) {
    return instance
      .put<PackResponseType>('/cards/pack', { cardsPack: { _id, name } })
      .then(res => res.data);
  },
};

// types

export type PacksDataQuery = {
  page?: number | string;
  pageCount?: number;
  packName?: string;
  sortPacks?: string;
  user_id?: string;
  min?: number;
  max?: number;
};

export type CardPackType = {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  deckCover: string;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
};

export type PacksResponseType = {
  cardPacks: CardPackType[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
};

type PackResponseType = {
  newCardsPack: CardPackType;
  token: string;
  tokenDeathTime: number;
};
