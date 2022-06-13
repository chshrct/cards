import React, {
  ChangeEvent,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import close from '../../assets/icons/close.png';
import { SuperButton, SuperInputText } from '../../components';
import { Popup } from '../../components/Portal/Popup/Popup';
import { Paginator } from '../../components/shared/Paginator/Paginator';
import { SuperInputSearch } from '../../components/shared/SuperInputSearch/SuperInputSearch';
import { useAppDispatch, useAppSelector } from '../../store';

import s from './PacksList.module.css';
import {
  addNewPack,
  changeInputTitle,
  changeNewPackTitle,
  fetchPacks,
  setMaxCardsCount,
  setMinCardsCount,
} from './PacksListReducer';
import { Table } from './Table/Table';
import { ViewToggle } from './ViewToggel/ViewToggle';

import { MultiRangeSlider } from 'components/shared/MultiRangeSlider/MultiRangeSlider';
import { DELAY, EMPTY_STRING, ZERO, PAGE_ONE } from 'constant';

export const PacksList: FC = () => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const inputTitle = useAppSelector(state => state.packs.inputTitle);
  const paginator = useAppSelector(state => state.packs.paginator);
  const minCardsCount = useAppSelector(state => state.packs.minCardsCount);
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount);
  const newPackTitle = useAppSelector(state => state.packs.newPackTitle);
  const { page, pageCount, totalCount, siblingCount } = paginator;
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
      dispatch(fetchPacks(PAGE_ONE, pageCount, inputTitle));
    } else {
      timeoutId.current = setTimeout(() => {
        dispatch(fetchPacks(PAGE_ONE, pageCount, inputTitle));
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
  const addNewPackHandle = (): void => {
    setIsWindowOpened(true);
  };
  const saveNewPack = (): void => {
    dispatch(addNewPack(newPackTitle));
    setIsWindowOpened(false);
  };
  const onPageChanged = (pageNumber: number | string): void => {
    dispatch(fetchPacks(pageNumber, pageCount, inputTitle));
  };
  const onPageSizeChange = (option: number): void => {
    dispatch(fetchPacks(page, option));
  };
  const onChangeNewPackTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(changeNewPackTitle(e.currentTarget.value));
  };
  const closeWindow = (): void => {
    setIsWindowOpened(false);
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
        <Popup isOpened={isWindowOpened} onClose={closeWindow}>
          <div className={s.modalWindow}>
            <div className={s.modalWidowHeader}>
              <span className={s.actionTitle}>Add new pack</span>
              <div>
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                <img src={close} alt="close" className={s.close} onClick={closeWindow} />
              </div>
            </div>
            <SuperInputText
              label="Name pack"
              onChange={onChangeNewPackTitle}
              value={newPackTitle}
            />
            <div className={s.modalWindowButtons}>
              <SuperButton onClick={closeWindow} color="secondary" size="small">
                Cansel
              </SuperButton>
              <SuperButton onClick={saveNewPack} disabled={isAddNewPack} size="small">
                Save
              </SuperButton>
            </div>
          </div>
        </Popup>

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
