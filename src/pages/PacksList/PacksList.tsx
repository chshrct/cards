import React, {
  ChangeEvent,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import { SuperButton, SuperInputText } from '../../components';
import { ModalWindow } from '../../components/shared/ModalWindow/ModalWindow';
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
import { DELAY, EMPTY_STRING, ZERO, ONE } from 'constant';

export const PacksList: FC = () => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const inputTitle = useAppSelector(state => state.packs.inputTitle);
  const paginator = useAppSelector(state => state.packs.paginator);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const { page, pageCount, totalCount, siblingCount } = paginator;
  const [newPackTitle, setNewPackTitle] = useState<string>('');
  const [isWindowOpened, setIsWindowOpened] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  /*
   *  Debounce for Search,MultiRange
   */

  const timeoutId = useRef() as MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  >;

  useEffect(() => {
    if (inputTitle === EMPTY_STRING && minCardsCount === ZERO && maxCardsCount === ZERO) {
      dispatch(fetchPacks(ONE, pageCount, inputTitle));
    } else {
      timeoutId.current = setTimeout(() => {
        dispatch(fetchPacks(ONE, pageCount, inputTitle));
      }, DELAY);
    }
    return () => {
      clearTimeout(timeoutId.current);
      timeoutId.current = undefined;
    };
  }, [inputTitle, minCardsCount, maxCardsCount]);

  const changeTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeInputTitle(e.currentTarget.value));
  };
  const closeWindow = (): void => {
    setIsWindowOpened(false);
  };
  const addNewPackHandle = (): void => {
    setIsWindowOpened(true);
  };
  const saveNewPack = (): void => {
    dispatch(addNewPack(newPackTitle));
    setNewPackTitle(EMPTY_STRING);
  };
  const onPageChanged = (pageNumber: number | string): void => {
    dispatch(fetchPacks(pageNumber, pageCount, inputTitle));
  };
  const onPageSizeChange = (option: number): void => {
    dispatch(fetchPacks(page, option));
  };
  const onChangeNewPackTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPackTitle(e.currentTarget.value);
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
        <ModalWindow
          closeWindow={closeWindow}
          isOpened={isWindowOpened}
          actionTitle="Add new pack"
          onClick={saveNewPack}
          submitButtonName="Save"
          disabled={isAddNewPack}
        >
          <div className={s.titlePack}>
            <SuperInputText
              label="Name pack"
              onChange={onChangeNewPackTitle}
              value={newPackTitle}
            />
          </div>
        </ModalWindow>
        {packs === undefined || !packs.length ? (
          <span>There is no packs. Try to add some.</span>
        ) : (
          <>
            <Table />
            <Paginator
              currentPage={page}
              onPageChange={onPageChanged}
              onPageSizeChange={onPageSizeChange}
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
