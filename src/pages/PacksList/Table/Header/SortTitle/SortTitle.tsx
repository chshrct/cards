import React, { useState } from 'react';

import { ReactComponent as ArrowDown } from '../../../../../assets/icons/arrows/arrowDown.svg';
import { ReactComponent as ArrowUp } from '../../../../../assets/icons/arrows/arrowUp.svg';
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
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const [num, setNum] = useState<0 | 1>(1);

  const page = useAppSelector(state => state.packs.paginator.page);
  const pageCount = useAppSelector(state => state.packs.paginator.pageCount);
  const inputTitle = useAppSelector(state => state.packs.inputTitle);
  let sortPacks = useAppSelector(state => state.packs.sortPacks);

  const dispatch = useAppDispatch();

  const changeArrowHandle = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    setNum(state => (state === 0 ? 1 : 0));
    dispatch(fetchPacks(page, pageCount, inputTitle, `${num}${sortBy}`));
  };

  if (sortPacks === undefined) sortPacks = '0updated';
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const viewArrow = sortPacks.slice(1, sortPacks.length) === sortBy;

  const arrow =
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    num === 0 ? (
      <ArrowDown
        className={s.arrow}
        height={15}
        width={15}
        // fill={error && 'red'}
      />
    ) : (
      <ArrowUp
        className={s.arrow}
        height={15}
        width={15}
        // fill={error && 'red'}
      />
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
