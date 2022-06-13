import React, { ChangeEvent, MutableRefObject, useEffect, useRef } from 'react';

import { useParams } from 'react-router-dom';

import { SuperButton } from '../../../components';
import { Paginator } from '../../../components/shared/Paginator/Paginator';
import { SuperInputSearch } from '../../../components/shared/SuperInputSearch/SuperInputSearch';
import { DELAY, DIVISOR_EQUAL_TWO, EMPTY_STRING, ZERO } from '../../../constant';
import { useAppDispatch, useAppSelector } from '../../../store';

import s from './CardsList.module.css';
import {
  addNewCard,
  fetchCards,
  setCardAnswer,
  setCardQuestion,
} from './CardsListReducer';
import { CardsRow } from './CarsdRow/CardsRow';
import { SortCardsTitle } from './SortCardsTitle/SortCardsTitle';

export const CardsList: React.FC = () => {
  const cards = useAppSelector(state => state.cards.cards.cards);
  const sortCards = useAppSelector(state => state.cards.sortCards);
  const { page, pageCount, totalCount, siblingCount } = useAppSelector(
    state => state.cards.paginator,
  );
  const isAddNewCard = useAppSelector(state => state.cards.isAddNewCard);
  const cardQuestion = useAppSelector(state => state.cards.cardQuestion);
  const cardAnswer = useAppSelector(state => state.cards.cardAnswer);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const isSearchEmpty = cardQuestion === EMPTY_STRING && cardAnswer === EMPTY_STRING;

  /*
   * Search Debounce
   */

  const timeoutId = useRef() as MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  >;

  useEffect(() => {
    if (isSearchEmpty) {
      dispatch(fetchCards(id, page, pageCount, sortCards, cardQuestion, cardAnswer));
    } else {
      timeoutId.current = setTimeout(() => {
        timeoutId.current = undefined;
        dispatch(fetchCards(id, page, pageCount, sortCards, cardQuestion, cardAnswer));
      }, DELAY);
    }
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [cardQuestion, cardAnswer]);

  const addNewCardHandle = (): void =>
    dispatch(addNewCard({ card: { cardsPack_id: id } }));
  const onPageChanged = (pageNumber: number | string): void => {
    dispatch(fetchCards(id, pageNumber, pageCount));
  };
  const onPageSizeChange = (option: number): void => {
    dispatch(fetchCards(id, page, option));
  };
  const onCardQuestionChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setCardQuestion(event.target.value));
  };
  const onCardAnswerChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setCardAnswer(event.target.value));
  };

  return (
    <div className={s.cardsListContainer}>
      <h4>cardsList</h4>
      <div className={s.searchButtonBlock}>
        <SuperInputSearch
          placeholder="Search by question..."
          onChange={onCardQuestionChange}
          value={cardQuestion}
        />
        <SuperInputSearch
          placeholder="Search by answer..."
          onChange={onCardAnswerChange}
          value={cardAnswer}
        />
        <SuperButton onClick={addNewCardHandle} disabled={isAddNewCard} size="large">
          Add new card
        </SuperButton>
      </div>
      {cards === undefined || !cards.length ? (
        <span>There is no cards. Try to add some.</span>
      ) : (
        <>
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
                sortBy="answer"
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
            {cards.map((p, i) => {
              return (
                <CardsRow
                  // eslint-disable-next-line no-underscore-dangle
                  key={p._id}
                  card={p}
                  className={
                    i % DIVISOR_EQUAL_TWO === ZERO ? s.lightBackground : s.darkBackground
                  }
                />
              );
            })}
          </div>
          <Paginator
            currentPage={page}
            onPageChange={onPageChanged}
            onPageSizeChange={onPageSizeChange}
            totalCount={totalCount}
            pageSize={pageCount}
            siblingCount={siblingCount}
            title="card"
          />
        </>
      )}
    </div>
  );
};
