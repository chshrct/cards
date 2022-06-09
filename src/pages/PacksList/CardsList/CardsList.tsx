import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { SuperButton } from '../../../components';
import { SuperInputSearch } from '../../../components/shared/SuperInputSearch/SuperInputSearch';
import { DIVISOR_EQUAL_TWO, EMPTY_STRING, REMAINDER_EQUAL_ZERO } from '../../../constant';
import { useAppDispatch, useAppSelector } from '../../../store';

import s from './CardsList.module.css';
import { addNewCard, fetchCards } from './CardsListReducer';
import { CardsRow } from './CarsdRow/CardsRow';
import { SortCardsTitle } from './SortCardsTitle/SortCardsTitle';

export const CardsList: React.FC = () => {
  const cards = useAppSelector(state => state.cards.cards.cards);
  const isAddNewCard = useAppSelector(state => state.cards.isAddNewCard);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCards(id));
  }, []);

  const addNewCardHandle = (): void =>
    dispatch(addNewCard({ card: { cardsPack_id: id } }));
  return (
    <div className={s.cardsListContainer}>
      <h4>cardsList</h4>
      <div className={s.searchButtonBlock}>
        <SuperInputSearch onChange={() => {}} value={EMPTY_STRING} />
        <SuperInputSearch onChange={() => {}} value={EMPTY_STRING} />
        <SuperButton onClick={addNewCardHandle} disabled={isAddNewCard} size="large">
          Add new card
        </SuperButton>
      </div>
      <div className={s.tableBlock}>
        <div className={s.head}>
          <SortCardsTitle
            cardsPackId={id}
            className={s.question}
            sortBy="question"
            title="Question"
          />
          <SortCardsTitle
            cardsPackId={id}
            className={s.answer}
            sortBy="cardsCount"
            title="Answer"
          />
          <SortCardsTitle
            cardsPackId={id}
            className={s.updated}
            sortBy="updated"
            title="Last Updated"
          />
          <SortCardsTitle
            cardsPackId={id}
            className={s.grade}
            sortBy="grade"
            title="Grade Updated"
          />
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
