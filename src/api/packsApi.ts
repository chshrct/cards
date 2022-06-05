import { instance } from './apiCfg';

const params = {
  packName: 'english',
  min: 3,
  max: 9,
  sortPacks: '0updated',
  page: 1,
  pageCount: 4,
  // user_id: '5eb543f6bea3ad21480f1ee7',
};

const cardsPack = {
  name: 'no Name',
  deckCover: 'url or base64',
  private: false,
};

export const packsApi = {
  fetchPacks() {
    return instance.get<PacksResponseType>('/cards/pack', { params }).then(res => {
      return res.data;
    });
  },
  addPack() {
    return instance.post<AddPackResponseType>('/cards/pack', { cardsPack }).then(res => {
      return res.data;
    });
  },
};

// types

type CardPackType = {
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
  created: Date;
  updated: Date;
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

type AddPackResponseType = {
  newCardsPack: CardPackType;
  token: string;
  tokenDeathTime: number;
};
