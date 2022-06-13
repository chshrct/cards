/* eslint-disable no-underscore-dangle */
import { FC, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { LearnCard } from './LearnCard/LearnCard';

import { CardType } from 'api/cardsApi';
import { ONE, ZERO } from 'constant';
import { weightedRandom } from 'helpers';
import { fetchCards } from 'pages/PacksList/CardsList/CardsListReducer';
import { useAppDispatch, useAppSelector } from 'store';

const cardsToLoad = 150;

export const Learn: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const packName = useAppSelector(
    state => state.packs.packs.cardPacks.find(pack => pack._id === id)?.name,
  );
  const cards = useAppSelector(state => state.cards.cards.cards);
  let cardToLearn = { question: 'why this card is not loaded?' };
  if (cards && cards.length > ZERO) {
    const grades = cards.map(el => el.grade);
    cardToLearn = weightedRandom<CardType>(cards, grades);
  }

  useEffect(() => {
    dispatch(fetchCards(id, ONE, cardsToLoad));
  }, [id]);

  return <LearnCard packName={packName} cardToLearn={cardToLearn} />;
};
