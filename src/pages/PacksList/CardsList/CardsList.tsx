import React, { ChangeEvent, MutableRefObject, useEffect, useRef, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { ReactComponent as ArrowBack } from '../../../assets/icons/arrows/arrowBack.svg';
import { SuperButton } from '../../../components';
import { ModalWindow } from '../../../components/shared/ModalWindow/ModalWindow';
import { Paginator } from '../../../components/shared/Paginator/Paginator';
import { SuperInputSearch } from '../../../components/shared/SuperInputSearch/SuperInputSearch';
import { BACK, DELAY, EMPTY_STRING, TWO, ZERO } from '../../../constant';
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

import { SuperTextarea } from 'components/shared/SuperTextarea/SuperTextarea';

export const CardsList: React.FC = () => {
  const cards = useAppSelector(state => state.cards.cards.cards);

  const packUserId = useAppSelector(state => state.cards.cards.packUserId);
  const userId = useAppSelector(state => state.app.userId);
  const sortCards = useAppSelector(state => state.cards.sortCards);
  const { page, pageCount, totalCount, siblingCount } = useAppSelector(
    state => state.cards.paginator,
  );
  const isAddNewCard = useAppSelector(state => state.cards.isAddNewCard);
  const cardQuestion = useAppSelector(state => state.cards.cardQuestion);
  const cardAnswer = useAppSelector(state => state.cards.cardAnswer);
  const [newQuestionTitle, setNewQuestionTitle] = useState<string>('');
  const [newAnswerTitle, setNewAnswerTitle] = useState<string>('');
  const [isWindowOpened, setIsWindowOpened] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const packName = useAppSelector(
    // eslint-disable-next-line no-underscore-dangle
    state => state.packs.packs.cardPacks.find(p => p._id === id)?.name,
  );

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

  const closeWindow = (): void => {
    setIsWindowOpened(false);
  };
  const addNewCardHandle = (): void => {
    setIsWindowOpened(true);
  };
  const saveNewCard = (): void => {
    dispatch(
      addNewCard({
        card: { cardsPack_id: id, question: newQuestionTitle, answer: newAnswerTitle },
      }),
    );
    setNewQuestionTitle(EMPTY_STRING);
    setNewAnswerTitle(EMPTY_STRING);
  };
  const onChangeQuestionTitle = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNewQuestionTitle(e.currentTarget.value);
  };
  const onChangeAnswerTitle = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNewAnswerTitle(e.currentTarget.value);
  };
  /* const addNewCardHandle = (): void =>
    dispatch(addNewCard({ card: { cardsPack_id: id } })); */
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

  const returnHandle = (): void => navigate(BACK);
  return (
    <div className={s.cardsListContainer}>
      <h3 className={s.headerWrapper}>
        <ArrowBack onClick={returnHandle} height={30} width={30} />
        {packName}
      </h3>
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
        {userId === packUserId ? (
          <SuperButton onClick={addNewCardHandle} disabled={isAddNewCard} size="large">
            Add new card
          </SuperButton>
        ) : null}
        <ModalWindow
          closeWindow={closeWindow}
          isOpened={isWindowOpened}
          actionTitle="Add new card"
          onClick={saveNewCard}
          submitButtonName="Save"
          disabled={isAddNewCard}
        >
          <div className={s.titleQuestion}>
            <SuperTextarea
              label="Question"
              onChange={onChangeQuestionTitle}
              value={newQuestionTitle}
              cols={30}
              rows={10}
            />
          </div>
          <div className={s.titleAnswer}>
            <SuperTextarea
              label="Answer"
              onChange={onChangeAnswerTitle}
              value={newAnswerTitle}
              cols={30}
              rows={10}
            />
          </div>
        </ModalWindow>
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
                disabled={isAddNewCard}
              />
              <SortCardsTitle
                cardsPackId={id}
                className={s.answer}
                sortBy="answer"
                title="Answer"
                disabled={isAddNewCard}
              />
              <SortCardsTitle
                cardsPackId={id}
                className={s.updated}
                sortBy="updated"
                title="Last Updated"
                disabled={isAddNewCard}
              />
              <SortCardsTitle
                cardsPackId={id}
                className={s.grade}
                sortBy="grade"
                title="Grade Updated"
                disabled={isAddNewCard}
              />
              {userId === packUserId ? (
                <div className={s.buttonsBlock}>Actions</div>
              ) : null}
            </div>
            {cards.map((p, i) => {
              return (
                <CardsRow
                  // eslint-disable-next-line no-underscore-dangle
                  key={p._id}
                  packUserId={p.user_id}
                  card={p}
                  className={i % TWO === ZERO ? s.lightBackground : s.darkBackground}
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
