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
  const dispatch = useAppDispatch();

  const deletePackHandle = (): void => dispatch(deletePacks('629ce515e851350004005e3e'));
  const editPackHandle = (): void =>
    dispatch(updatePacks('629ce515e851350004005e3e', 'NEW PACK NAME'));

  return (
    <div className={`${s.body} ${className}`}>
      <div className={s.name}>{pack.name}</div>
      <div className={s.cardsCount}>{pack.cardsCount}</div>
      <div className={s.updated}>
        {pack.updated.slice(SLICE_BEGIN_INDEX, SLICE_END_INDEX)}
      </div>
      <div className={s.userName}>{pack.user_name}</div>
      <div className={s.buttonsBlock}>
        <SuperButton onClick={deletePackHandle} disabled={isAddNewPack}>
          Delete
        </SuperButton>
        <SuperButton onClick={editPackHandle} disabled={isAddNewPack}>
          Edit
        </SuperButton>
      </div>
    </div>
  );
};
