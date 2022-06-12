/* eslint-disable no-underscore-dangle */
import React, { FC } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import s from './Learn.module.css';

import { SuperButton } from 'components';
import { AppRoutePaths } from 'routes';
import { useAppSelector } from 'store';

export const Learn: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const packName = useAppSelector(
    state => state.packs.packs.cardPacks.find(pack => pack._id === id)?.name,
  );
  const question = 'Some Question RIght there!';

  const onCancelClick = (): void => {
    navigate(AppRoutePaths.PACKS_LIST);
  };

  return (
    <div className={s.learnWrapper}>
      <h2> {`Learn ${packName || 'some pack'}`}</h2>
      <p>
        <b>Question: </b>
        {`${question}`}
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
