import React, { FC, useEffect } from 'react';

import { SuperButton, SuperRange } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store';

import s from './PacksList.module.css';
import { addNewPack, fetchPacks } from './PacksListReducer';
import { Table } from './Table/Table';

export const PacksList: FC = () => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const dispatch = useAppDispatch();

  const addNewPackHandle = (): void => dispatch(addNewPack());

  useEffect(() => {
    dispatch(fetchPacks());
  }, []);
  return (
    <div className={s.packsListContainer}>
      <div className={s.sideBar}>
        <div>Show packs cards</div>
        <h4>Number of cards</h4>
        <SuperRange />
      </div>
      <div className={s.main}>
        <h3>Packs list</h3>
        <div className={s.searchBlock}>
          <span>search</span>
          <SuperButton onClick={addNewPackHandle} disabled={isAddNewPack}>
            Add new pack
          </SuperButton>
        </div>
        <div className={s.tableBlock}>
          <Table />
        </div>
        <div className={s.paginationBlock}>pagination</div>
      </div>
    </div>
  );
};
