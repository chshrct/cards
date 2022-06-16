/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useState } from 'react';

import { ReactComponent as ArrowDown } from '../../../../assets/icons/arrows/arrowDown.svg';
import { ReactComponent as ArrowUp } from '../../../../assets/icons/arrows/arrowUp.svg';
import { ONE } from '../../../../constant';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { fetchCards } from '../CardsListReducer';

import s from './SortCardsTitle.module.css';

type SortTitleType = {
  className: string;
  sortBy?: string;
  title: string;
  cardsPackId: string | undefined;
  disabled: boolean;
};
export const SortCardsTitle: React.FC<SortTitleType> = ({
  className,
  sortBy,
  title,
  cardsPackId,
  disabled,
}) => {
  const [num, setNum] = useState<0 | 1>(1);

  let sortCards = useAppSelector(state => state.cards.sortCards);

  const dispatch = useAppDispatch();

  const changeArrowHandle = (): void => {
    setNum(state => (state === 0 ? 1 : 0));
    dispatch(
      fetchCards({ cardsPack_id: cardsPackId, page: ONE, sortCards: `${num}${sortBy}` }),
    );
  };

  if (sortCards === undefined) sortCards = '0grade';
  const viewArrow = sortCards.slice(1, sortCards.length) === sortBy;

  const arrow =
    num === 0 ? (
      <ArrowDown className={s.arrow} height={15} width={15} />
    ) : (
      <ArrowUp className={s.arrow} height={15} width={15} />
    );
  return (
    <div
      role="none"
      onClick={!disabled ? changeArrowHandle : undefined}
      className={`${className} ${disabled && s.disabled}`}
    >
      {title}
      {viewArrow && arrow}
    </div>
  );
};
