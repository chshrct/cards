import React from 'react';

import { DIVISOR_EQUAL_TWO, REMAINDER_EQUAL_ZERO } from '../../../constant';
import { useAppSelector } from '../../../store';

import s from './CardsList.module.css';
import { CardsRow } from './CarsdRow/CardsRow';

export const CardsList: React.FC = () => {
  const cards = useAppSelector(state => state.cards.cards.cards);

  // const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   dispatch(fetchCards());
  // }, []);
  return (
    <div className={s.cardsListContainer}>
      cardsList
      {cards.map((p, i) => {
        return (
          <CardsRow
            // eslint-disable-next-line no-underscore-dangle
            key={p._id}
            card={p}
            className={
              i % DIVISOR_EQUAL_TWO === REMAINDER_EQUAL_ZERO
                ? s.lightBackground
                : s.darkBackground
            }
          />
        );
      })}
    </div>
  );
};
