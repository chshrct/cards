import React, { FC, useEffect } from 'react';

import { SuperButton, SuperRange } from '../../components';
import { Paginator } from '../../components/shared/Paginator/Paginator';
import { useAppDispatch, useAppSelector } from '../../store';

import s from './PacksList.module.css';
import { addNewPack, fetchPacks } from './PacksListReducer';
import { Table } from './Table/Table';

export const PacksList: FC = () => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const paginator = useAppSelector(state => state.packs.paginator);
  const { page, pageCount, totalCount, siblingCount } = paginator;
  const dispatch = useAppDispatch();

  const addNewPackHandle = (): void => dispatch(addNewPack(page, pageCount));
  const onPageChanged = (pageNumber: number | string): void => {
    dispatch(fetchPacks(pageNumber, pageCount));
  };
  useEffect(() => {
    dispatch(fetchPacks(page, pageCount));
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
        <div className={s.paginationBlock}>
          <Paginator
            // @ts-ignore
            currentPage={page}
            onPageChange={onPageChanged}
            totalCount={totalCount}
            pageSize={pageCount}
            siblingCount={siblingCount}
          />
        </div>
      </div>
    </div>
  );
};
