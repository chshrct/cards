/* eslint-disable no-underscore-dangle */
import React, { ChangeEvent, MutableRefObject, useEffect, useRef } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as BackArrow } from '../../../assets/icons/back-arrow.svg';
import { SuperButton } from '../../../components';
import { Paginator } from '../../../components/shared/Paginator/Paginator';
import { SuperInputSearch } from '../../../components/shared/SuperInputSearch/SuperInputSearch';
import {
  BACK,
  DELAY,
  DIVISOR_EQUAL_TWO,
  EMPTY_STRING,
  REMAINDER_EQUAL_ZERO,
} from '../../../constant';
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
  const cardsCreatorId = useAppSelector(state => state.cards.cards.packUserId);
  const { page, pageCount, totalCount, siblingCount } = useAppSelector(
    state => state.cards.paginator,
  );
  const isAddNewCard = useAppSelector(state => state.cards.isAddNewCard);
  const cardQuestion = useAppSelector(state => state.cards.cardQuestion);
  const cardAnswer = useAppSelector(state => state.cards.cardAnswer);
  const userId = useAppSelector(state => state.app.userId);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const packName = useAppSelector(
    state => state.packs.packs.cardPacks.find(pack => pack._id === id)?.name,
  );

  const isSearchEmpty = cardQuestion === EMPTY_STRING && cardAnswer === EMPTY_STRING;
  const isUsersPack = cardsCreatorId === userId;

  /*
   * Debounce for Search
   */

  const timeoutId = useRef() as MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  >;

  useEffect(() => {
    if (isSearchEmpty) {
      dispatch(fetchCards(id, sortCards, page, pageCount, cardQuestion, cardAnswer));
    } else {
      timeoutId.current = setTimeout(() => {
        dispatch(fetchCards(id, sortCards, page, pageCount, cardQuestion, cardAnswer));
      }, DELAY);
    }
    return () => {
      clearTimeout(timeoutId.current);
      timeoutId.current = undefined;
    };
  }, [cardQuestion, cardAnswer]);

  const addNewCardHandle = (): void =>
    dispatch(addNewCard({ card: { cardsPack_id: id } }));
  const onPageChanged = (pageNumber: number | string): void => {
    dispatch(fetchCards(id, sortCards, pageNumber, pageCount));
  };

  const onCardQuestionChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setCardQuestion(event.target.value));
  };
  const onCardAnswerChange = (event: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setCardAnswer(event.target.value));
  };

  return (
    <div className={s.cardsListContainer}>
      <div className={s.headerWrapper}>
        <BackArrow onClick={() => navigate(BACK)} />
        <h3>{packName}</h3>
      </div>
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
        <SuperButton
          onClick={addNewCardHandle}
          disabled={isAddNewCard || !isUsersPack}
          size="large"
        >
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
      <Paginator
        // @ts-ignore
        currentPage={page}
        onPageChange={onPageChanged}
        totalCount={totalCount}
        pageSize={pageCount}
        siblingCount={siblingCount}
        title="card"
      />
    </div>
  );
};
