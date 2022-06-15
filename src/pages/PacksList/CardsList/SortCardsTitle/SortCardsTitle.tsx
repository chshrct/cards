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
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [num, setNum] = useState<0 | 1>(1);

  let sortCards = useAppSelector(state => state.cards.sortCards);
  const { pageCount } = useAppSelector(state => state.cards.paginator);

  const dispatch = useAppDispatch();

  const changeArrowHandle = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    setNum(state => (state === 0 ? 1 : 0));
    dispatch(fetchCards(cardsPackId, ONE, pageCount, `${num}${sortBy}`));
  };

  if (sortCards === undefined) sortCards = '0grade';
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const viewArrow = sortCards.slice(1, sortCards.length) === sortBy;

  const arrow =
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    num === 0 ? (
      <ArrowDown
        className={s.arrow}
        height={15}
        width={15}
        // fill={error && 'red'}
      />
    ) : (
      <ArrowUp
        className={s.arrow}
        height={15}
        width={15}
        // fill={error && 'red'}
      />
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
