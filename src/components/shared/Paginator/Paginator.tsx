import React, { FC } from 'react';

import arrowLeftBlue from '../../../assets/icons/arrows/arrowLeftBlue.png';
import arrowLeftGrey from '../../../assets/icons/arrows/arrowLeftGrey.png';
import arrowRightBlue from '../../../assets/icons/arrows/arrowRightBlue.png';
import arrowRightGrey from '../../../assets/icons/arrows/arrowRightGrey.png';

import s from './Paginator.module.css';
import { DOTS, usePagination } from './usePagination';

type PaginatorPropsType = {
  title: string;
  currentPage: number;
  onPageChange: (currentPage: number | string) => void;
  totalCount: number;
  siblingCount: number;
  pageSize: number;
};

export const Paginator: FC<PaginatorPropsType> = (props: PaginatorPropsType) => {
  const { currentPage, onPageChange, totalCount, siblingCount, pageSize, title } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const one = 1;
  const four = 4;
  const onNext = (): void => {
    onPageChange(currentPage + one);
  };
  const onPrevious = (): void => {
    onPageChange(currentPage - one);
  };

  const lastPage = paginationRange[paginationRange.length - one];
  const finalPageStyle = (pageNumber: number | string): any => {
    return `${s.paginationItem} ${currentPage === pageNumber && s.selectedPage}`;
  };
  const finalListPagesStyle = `${s.paginationItem}  ${s.listPages}`;
  const finalDotsStyle = `${s.paginationItem}  ${s.dots}`;
  const range = pageSize * currentPage;
  const finalListPages =
    totalCount === one
      ? `${totalCount} of ${totalCount} ${title}`
      : `${range - (pageSize - one)}-${
          // eslint-disable-next-line no-nested-ternary
          totalCount > four ? (range > totalCount ? totalCount : range) : totalCount
        } 
        of ${totalCount} ${title}s`;
  return (
    <div className={s.paginationContainer}>
      <div className={finalListPagesStyle}>{finalListPages}</div>
      <div className={s.pagesContainer}>
        <div className={s.paginationItem}>
          {currentPage === one ? (
            <img src={arrowLeftGrey} alt="prev" className={s.arrow} />
          ) : (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <img
              src={arrowLeftBlue}
              alt="prev"
              onClick={onPrevious}
              className={s.arrow}
            />
          )}
        </div>
        {paginationRange.map((pageNumber: number | string, i: number) => {
          if (pageNumber === DOTS) {
            return (
              <span key={`${Math.random()}`} className={finalDotsStyle}>
                {DOTS}
              </span>
            );
          }
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <span
              key={paginationRange[i]}
              className={finalPageStyle(pageNumber)}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </span>
          );
        })}
        <div className={s.paginationItem}>
          {currentPage === lastPage ? (
            <img src={arrowRightGrey} alt="next" className={s.arrow} />
          ) : (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <img src={arrowRightBlue} alt="next" onClick={onNext} className={s.arrow} />
          )}
        </div>
      </div>
    </div>
  );
};
