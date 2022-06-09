import React, { ChangeEvent, FC, useEffect, useRef } from 'react';

import { SuperButton } from '../../components';
import { Paginator } from '../../components/shared/Paginator/Paginator';
import { SuperInputSearch } from '../../components/shared/SuperInputSearch/SuperInputSearch';
import { useAppDispatch, useAppSelector } from '../../store';

import s from './PacksList.module.css';
import {
  addNewPack,
  changeInputTitle,
  fetchPacks,
  setMaxCardsCount,
  setMinCardsCount,
} from './PacksListReducer';
import { Table } from './Table/Table';
import { ViewToggle } from './ViewToggel/ViewToggle';

import { MultiRangeSlider } from 'components/shared/MultiRangeSlider/MultiRangeSlider';
import {
  DELAY,
  EMPTY_STRING,
  MAX_CARDS_COUNT,
  MIN_CARDS_COUNT,
  PAGE_ONE,
} from 'constant';

export const PacksList: FC = () => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const inputTitle = useAppSelector(state => state.packs.inputTitle);
  const paginator = useAppSelector(state => state.packs.paginator);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const { page, pageCount, totalCount, siblingCount } = paginator;
  const dispatch = useAppDispatch();

  /*
   *  Debounce for Search,MultiRange
   */

  const timeoutId = useRef();

  useEffect(() => {
    if (
      inputTitle === EMPTY_STRING &&
      minCardsCount === MIN_CARDS_COUNT &&
      maxCardsCount === MAX_CARDS_COUNT
    ) {
      dispatch(fetchPacks(PAGE_ONE, pageCount, inputTitle));
    } else {
      // @ts-ignore
      timeoutId.current = setTimeout(() => {
        dispatch(fetchPacks(PAGE_ONE, pageCount, inputTitle));
      }, DELAY);
    }
    return () => {
      clearTimeout(timeoutId.current);
      // @ts-ignore
      timeoutId.current = null;
    };
  }, [inputTitle, minCardsCount, maxCardsCount]);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeInputTitle(e.currentTarget.value));
  };
  const addNewPackHandle = (): void => dispatch(addNewPack());
  const onPageChanged = (pageNumber: number | string): void => {
    dispatch(fetchPacks(pageNumber, pageCount, inputTitle));
  };
  const onMultiRangeSliderChange = ({ min, max }: { min: number; max: number }): void => {
    dispatch(setMinCardsCount(min));
    dispatch(setMaxCardsCount(max));
  };

  const packs = useAppSelector(state => state.packs.packs.cardPacks);
  return (
    <div className={s.packsListContainer}>
      <div className={s.sideBar}>
        <h4>Show packs cards</h4>
        <ViewToggle />
        <h4>Number of cards</h4>
        <MultiRangeSlider min={0} max={150} onChange={onMultiRangeSliderChange} />
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
          <>
            <Table />
            <Paginator
              // @ts-ignore
              currentPage={page}
              onPageChange={onPageChanged}
              totalCount={totalCount}
              pageSize={pageCount}
              siblingCount={siblingCount}
              title="pack"
            />
          </>
        )}
      </div>
    </div>
  );
};
