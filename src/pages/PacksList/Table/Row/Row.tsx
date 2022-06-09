/* eslint-disable no-underscore-dangle */
import React from 'react';

import { Link } from 'react-router-dom';

import { CardPackType } from '../../../../api/packsApi';
import { SuperButton } from '../../../../components';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { deletePacks, updatePacks } from '../../PacksListReducer';

import s from './Row.module.css';

type RowType = {
  pack: CardPackType;
  className: string;
};

const SLICE_BEGIN_INDEX = 0;
const SLICE_END_INDEX = 10;

export const Row: React.FC<RowType> = ({ pack, className }) => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const userId = useAppSelector(state => state.app.userId);
  const dispatch = useAppDispatch();

  const deletePackHandle = (): void => dispatch(deletePacks(pack._id));
  const editPackHandle = (): void => dispatch(updatePacks(pack._id, 'NEW PACK NAME'));

  return (
    <div className={`${s.body} ${className}`}>
      <Link to={pack._id} className={s.name}>
        {pack.name}
      </Link>
      <div className={s.cardsCount}>{pack.cardsCount}</div>
      <div className={s.updated}>
        {pack.updated.slice(SLICE_BEGIN_INDEX, SLICE_END_INDEX)}
      </div>
      <div className={s.userName}>{pack.user_name}</div>
      <div className={s.buttonsBlock}>
        {pack.user_id === userId ? (
          <div>
            <SuperButton
              color="alerty"
              shape="square"
              onClick={deletePackHandle}
              disabled={isAddNewPack}
            >
              Delete
            </SuperButton>
            <SuperButton
              color="secondary"
              shape="square"
              onClick={editPackHandle}
              disabled={isAddNewPack}
            >
              Edit
            </SuperButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};
