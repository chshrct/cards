import React from 'react';

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
  // eslint-disable-next-line no-underscore-dangle
  const userId = useAppSelector(state => state.app.userId);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line no-underscore-dangle
  const deletePackHandle = (): void => dispatch(deletePacks(pack._id));
  const editPackHandle = (): void =>
    // eslint-disable-next-line no-underscore-dangle
    dispatch(updatePacks(pack._id, 'NEW PACK NAME'));

  return (
    <div className={`${s.body} ${className}`}>
      <div className={s.name}>{pack.name}</div>
      <div className={s.cardsCount}>{pack.cardsCount}</div>
      <div className={s.updated}>
        {pack.updated.slice(SLICE_BEGIN_INDEX, SLICE_END_INDEX)}
      </div>
      <div className={s.userName}>{pack.user_name}</div>
      <div className={s.buttonsBlock}>
        {/* eslint-disable-next-line no-underscore-dangle */}
        {pack.user_id === userId ? (
          <div>
            <SuperButton onClick={deletePackHandle} disabled={isAddNewPack}>
              Delete
            </SuperButton>
            <SuperButton onClick={editPackHandle} disabled={isAddNewPack}>
              Edit
            </SuperButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};
