import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { DIVISOR_EQUAL_TWO, REMAINDER_EQUAL_ZERO } from '../../../constant';
import { useAppDispatch, useAppSelector } from '../../../store';
import { SortTitle } from '../Table/Header/SortTitle/SortTitle';

import s from './CardsList.module.css';
import { fetchCards } from './CardsListReducer';
import { CardsRow } from './CarsdRow/CardsRow';

export const CardsList: React.FC = () => {
  const cards = useAppSelector(state => state.cards.cards.cards);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCards(id));
  }, []);
  return (
    <div className={s.cardsListContainer}>
      <h4>cardsList</h4>
      <div className={s.tableBlock}>
        <div className={s.head}>
          <div className={s.question}>Question</div>
          <SortTitle className={s.answer} sortBy="cardsCount" title="Answer" />
          <SortTitle className={s.updated} sortBy="updated" title="Last Updated" />
          <div className={s.grade}>Grade</div>
        </div>
        {cards
          ? cards.map((p, i) => {
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
            })
          : null}
      </div>
    </div>
  );
};
