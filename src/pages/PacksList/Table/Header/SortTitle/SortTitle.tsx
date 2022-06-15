/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useState } from 'react';

import { ReactComponent as ArrowDown } from '../../../../../assets/icons/arrows/arrowDown.svg';
import { ReactComponent as ArrowUp } from '../../../../../assets/icons/arrows/arrowUp.svg';
import { ONE } from '../../../../../constant';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { fetchPacks } from '../../../PacksListReducer';

import s from './SortTitle.module.css';

type SortTitleType = {
  className: string;
  sortBy?: string;
  title: string;
  disabled: boolean;
};
export const SortTitle: React.FC<SortTitleType> = ({
  className,
  sortBy,
  title,
  disabled,
}) => {
  const [num, setNum] = useState<0 | 1>(1);

  const pageCount = useAppSelector(state => state.packs.paginator.pageCount);
  const inputTitle = useAppSelector(state => state.packs.inputTitle);
  let sortPacks = useAppSelector(state => state.packs.sortPacks);

  const dispatch = useAppDispatch();

  const changeArrowHandle = (): void => {
    setNum(state => (state === 0 ? 1 : 0));
    dispatch(fetchPacks(ONE, pageCount, inputTitle, `${num}${sortBy}`));
  };

  if (sortPacks === undefined) sortPacks = '0updated';
  const viewArrow = sortPacks.slice(1, sortPacks.length) === sortBy;

  const arrow =
    num === 0 ? (
      <ArrowDown className={s.arrow} height={15} width={15} />
    ) : (
      <ArrowUp className={s.arrow} height={15} width={15} />
    );
  return (
    <div
      role="none"
      onClick={!disabled ? changeArrowHandle : undefined}
      className={`${className} ${disabled && s.disabled}`}
    >
      {title}
      {viewArrow && arrow}
    </div>
  );
};
