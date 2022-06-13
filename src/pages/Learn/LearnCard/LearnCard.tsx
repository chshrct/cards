import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import s from './LearnCard.module.css';

import { CardType } from 'api/cardsApi';
import { SuperButton } from 'components';
import { AppRoutePaths } from 'routes';

type PropsType = {
  packName: string | undefined;
  cardToLearn: CardType | { question: string };
};

export const LearnCard: FC<PropsType> = ({ cardToLearn, packName }) => {
  const navigate = useNavigate();

  const onCancelClick = (): void => {
    navigate(AppRoutePaths.PACKS_LIST);
  };
  return (
    <div className={s.learnWrapper}>
      <h2>{`Learn ${packName || 'some pack'}`}</h2>
      <p>
        <b>Question: </b>
        {`${cardToLearn?.question}`}
      </p>
      <div className={s.buttonWrapper}>
        <SuperButton size="small" color="secondary" onClick={onCancelClick}>
          Cancel
        </SuperButton>
        <SuperButton size="medium">Show Answer</SuperButton>
      </div>
    </div>
  );
};
