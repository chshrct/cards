import React, { ChangeEvent, FC, useEffect, useRef } from 'react';

import { SuperButton, SuperRange } from '../../components';
import { Paginator } from '../../components/shared/Paginator/Paginator';
import { SuperInputSearch } from '../../components/shared/SuperInputSearch/SuperInputSearch';
import { useAppDispatch, useAppSelector } from '../../store';

import s from './PacksList.module.css';
import { addNewPack, changeInputTitle, fetchPacks } from './PacksListReducer';
import { Table } from './Table/Table';
import { ViewToggle } from './ViewToggel/ViewToggle';

import { DELAY, EMPTY_STRING, PAGE_ONE } from 'constant';

export const PacksList: FC = () => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const inputTitle = useAppSelector(state => state.packs.inputTitle);
  const paginator = useAppSelector(state => state.packs.paginator);
  const { page, pageCount, totalCount, siblingCount } = paginator;
  const dispatch = useAppDispatch();

  /*
   *  Debounce for Search Input
   */

  const timeoutId = useRef();

  useEffect(() => {
    if (inputTitle === EMPTY_STRING)
      dispatch(fetchPacks(PAGE_ONE, pageCount, inputTitle));

    if (inputTitle !== EMPTY_STRING)
      // @ts-ignore
      timeoutId.current = setTimeout(() => {
        dispatch(fetchPacks(PAGE_ONE, pageCount, inputTitle));
      }, DELAY);
    return () => {
      clearTimeout(timeoutId.current);
      // @ts-ignore
      timeoutId.current = null;
    };
  }, [inputTitle]);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeInputTitle(e.currentTarget.value));
  };
  const addNewPackHandle = (): void => dispatch(addNewPack());
  const onPageChanged = (pageNumber: number | string): void => {
    dispatch(fetchPacks(pageNumber, pageCount, inputTitle));
  };

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
