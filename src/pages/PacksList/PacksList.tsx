import React, { ChangeEvent, FC, useEffect } from 'react';

import { SuperButton, SuperRange } from '../../components';
import { Paginator } from '../../components/shared/Paginator/Paginator';
import { SuperInputSearch } from '../../components/shared/SuperInputSearch/SuperInputSearch';
import { useAppDispatch, useAppSelector } from '../../store';

import s from './PacksList.module.css';
import { addNewPack, changeInputTitle, fetchPacks } from './PacksListReducer';
import { Table } from './Table/Table';
import { ViewToggle } from './ViewToggel/ViewToggle';

export const PacksList: FC = () => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const inputTitle = useAppSelector(state => state.packs.inputTitle);
  const paginator = useAppSelector(state => state.packs.paginator);
  const { page, pageCount, totalCount, siblingCount } = paginator;
  const dispatch = useAppDispatch();

  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeInputTitle(e.currentTarget.value));
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    dispatch(fetchPacks(1, pageCount, inputTitle));
  };
  const addNewPackHandle = (): void => dispatch(addNewPack());
  const onPageChanged = (pageNumber: number | string): void => {
    dispatch(fetchPacks(pageNumber, pageCount, inputTitle));
  };
  useEffect(() => {
    dispatch(fetchPacks(page, pageCount));
  }, []);
  const packs = useAppSelector(state => state.packs.packs.cardPacks);
  return (
    <div className={s.packsListContainer}>
      <div className={s.sideBar}>
        <h4>Show packs cards</h4>
        <ViewToggle />
        <h4>Number of cards</h4>
        <SuperRange />
      </div>
      <div className={s.main}>
        <h3>Packs list</h3>
        <div className={s.searchBlock}>
          <SuperInputSearch onChange={changeTitle} value={inputTitle} />
          <SuperButton onClick={addNewPackHandle} disabled={isAddNewPack} size="large">
            Add new pack
          </SuperButton>
        </div>
        {packs === undefined || !packs.length ? (
          <span>This pack is empty. Click add new card to fill this pack</span>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  );
};
