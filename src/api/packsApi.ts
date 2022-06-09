import { instance } from './apiCfg';

/* const params = {
  packName: 'english',
  min: 3,
  max: 9,
  sortPacks: '0updated',
  page: 1,
  pageCount: 4,
  // user_id: '5eb543f6bea3ad21480f1ee7',
}; */

const cardsPack = {
  name: 'no Name',
  deckCover: 'url or base64',
  private: false,
};

export const packsApi = {
  fetchPacks(
    page?: number | string,
    pageCount?: number,
    packName?: string,
    sortPacks?: string,
    // eslint-disable-next-line camelcase
    user_id?: string,
    min?: number,
    max?: number,
  ) {
    return instance
      .get<PacksResponseType>('/cards/pack', {
        // eslint-disable-next-line camelcase
        params: { page, pageCount, packName, sortPacks, user_id, min, max },
      })
      .then(res => res.data);
  },
  addPack() {
    return instance
      .post<PackResponseType>('/cards/pack', { cardsPack })
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
