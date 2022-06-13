import React from 'react';

import { Rating } from 'react-simple-star-rating';

import { CardType } from '../../../../api/cardsApi';
import { SuperButton } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { deleteCard, updateCard } from '../CardsListReducer';

import s from './CardsRow.module.css';

type CardsRowType = {
  card: CardType;
  className: string;
  packUserId: string | undefined;
};

const SLICE_BEGIN_INDEX = 0;
const SLICE_END_INDEX = 10;

export const CardsRow: React.FC<CardsRowType> = ({ card, className, packUserId }) => {
  const isAddNewCard = useAppSelector(state => state.cards.isAddNewCard);
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => state.app.userId);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-underscore-dangle
  const deleteCardHandle = (): void => dispatch(deleteCard(card._id));
  const editCardHandle = (): void =>
    dispatch(
      updateCard({
        card: {
          // eslint-disable-next-line no-underscore-dangle
          _id: card._id,
          answer: 'ANSWER',
          question: 'QUESTION',
          comments: 'NO COMMENTS',
        },
      }),
    );

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
          <SuperButton
            color="secondary"
            shape="square"
            onClick={editCardHandle}
            disabled={isAddNewCard}
          >
            Edit
          </SuperButton>
        </div>
      ) : null}
    </div>
  );
};
