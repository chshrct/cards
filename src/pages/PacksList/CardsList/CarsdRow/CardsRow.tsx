import React from 'react';

import { CardType } from '../../../../api/cardsApi';

import s from './CardsRow.module.css';

type CardsRowType = {
  card: CardType;
  className: string;
};

const SLICE_BEGIN_INDEX = 0;
const SLICE_END_INDEX = 10;

export const CardsRow: React.FC<CardsRowType> = ({ card, className }) => {
  // const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  // eslint-disable-next-line no-underscore-dangle
  // const userId = useAppSelector(state => state.app.userId);
  // const dispatch = useAppDispatch();

  // eslint-disable-next-line no-underscore-dangle
  // const deletePackHandle = (): void => dispatch(deletePacks(card._id));
  // const editPackHandle = (): void =>
  // eslint-disable-next-line no-underscore-dangle
  // dispatch(updatePacks(card._id, 'NEW PACK NAME'));

  return (
    <div className={`${s.body} ${className}`}>
      <div className={s.name}>{card.question}</div>
      <div className={s.cardsCount}>{card.answer}</div>
      <div className={s.updated}>
        {card.updated.slice(SLICE_BEGIN_INDEX, SLICE_END_INDEX)}
      </div>
      <div className={s.userName}>{card.grade}</div>
    </div>
  );
};
