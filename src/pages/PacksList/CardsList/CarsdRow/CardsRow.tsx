/* eslint-disable no-underscore-dangle */

import React, { ChangeEvent, useState } from 'react';

import { Rating } from 'react-simple-star-rating';

import { CardType } from '../../../../api/cardsApi';
import { SuperButton } from '../../../../components';
import { ModalWindow } from '../../../../components/shared/ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { deleteCard, updateCard } from '../CardsListReducer';

import s from './CardsRow.module.css';

import { SuperTextarea } from 'components/shared/SuperTextarea/SuperTextarea';

type CardsRowType = {
  card: CardType;
  className: string;
  packUserId: string | undefined;
};

const SLICE_BEGIN_INDEX = 0;
const SLICE_END_INDEX = 10;

export const CardsRow: React.FC<CardsRowType> = ({ card, className, packUserId }) => {
  const isAddNewCard = useAppSelector(state => state.cards.isAddNewCard);
  const userId = useAppSelector(state => state.app.userId);
  const [isDeleteWindowOpened, setIsDeleteWindowOpened] = useState<boolean>(false);
  const [isEditWindowOpened, setIsEditWindowOpened] = useState<boolean>(false);
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);

  const dispatch = useAppDispatch();

  const closeDeleteWindow = (): void => {
    setIsDeleteWindowOpened(false);
  };
  const deleteCardHandle = (): void => {
    setIsDeleteWindowOpened(true);
  };
  const deleteThisCard = (): void => {
    dispatch(deleteCard(card._id));
  };
  const closeEditWindow = (): void => {
    setIsEditWindowOpened(false);
  };
  const editCardHandle = (): void => {
    setIsEditWindowOpened(true);
  };
  const updateThisCard = (): void => {
    dispatch(
      updateCard({
        card: {
          _id: card._id,
          answer,
          question,
          comments: 'NO COMMENTS',
        },
      }),
    );
  };
  const editQuestion = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(e.currentTarget.value);
  };
  const editAnswer = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setAnswer(e.currentTarget.value);
  };
  return (
    <div className={`${s.body} ${className}`}>
      <div className={s.question}>{card.question}</div>
      <div className={s.answer}>{card.answer}</div>
      <div className={s.updated}>
        {card.updated.slice(SLICE_BEGIN_INDEX, SLICE_END_INDEX)}
      </div>
      <div className={s.grade}>
        <Rating
          ratingValue={0}
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          initialValue={card.grade}
          readonly
          iconsCount={5}
          size={17}
          fillColor="#21268F"
          emptyColor="#D7D8EF"
        />
      </div>

      {packUserId === userId ? (
        <div className={s.buttonsBlock}>
          <SuperButton
            color="alerty"
            shape="square"
            onClick={deleteCardHandle}
            disabled={isAddNewCard}
          >
            Delete
          </SuperButton>
          <ModalWindow
            closeWindow={closeDeleteWindow}
            isOpened={isDeleteWindowOpened}
            actionTitle="Delete Card"
            onClick={deleteThisCard}
            submitButtonName="Delete"
            disabled={isAddNewCard}
            buttonColor="alerty"
          >
            <span className={s.deleteCardText}>
              Do you really want to remove
              <span className={s.cardName}>
                {' '}
                Card - &quot;{card.question}&quot;?{' '}
              </span>{' '}
            </span>
          </ModalWindow>
          <SuperButton
            color="secondary"
            shape="square"
            onClick={editCardHandle}
            disabled={isAddNewCard}
          >
            Edit
          </SuperButton>
          <ModalWindow
            closeWindow={closeEditWindow}
            isOpened={isEditWindowOpened}
            actionTitle="Edit Pack"
            onClick={updateThisCard}
            submitButtonName="Save"
            disabled={isAddNewCard}
          >
            <div className={s.titleQuestion}>
              <SuperTextarea
                label="Question"
                onChange={editQuestion}
                value={question}
                cols={30}
                rows={10}
              />
            </div>
            <div className={s.titleAnswer}>
              <SuperTextarea
                label="Answer"
                onChange={editAnswer}
                value={answer}
                cols={30}
                rows={10}
              />
            </div>
          </ModalWindow>
        </div>
      ) : null}
    </div>
  );
};
