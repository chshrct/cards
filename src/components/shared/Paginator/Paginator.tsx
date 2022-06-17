/* eslint-disable no-magic-numbers */
import { FC } from 'react';

import arrowLeftBlue from '../../../assets/icons/arrows/arrowLeftBlue.png';
import arrowLeftGrey from '../../../assets/icons/arrows/arrowLeftGrey.png';
import arrowRightBlue from '../../../assets/icons/arrows/arrowRightBlue.png';
import arrowRightGrey from '../../../assets/icons/arrows/arrowRightGrey.png';
import { useAppSelector } from '../../../store';
import { SuperSelect } from '../SuperSelect';

import s from './Paginator.module.css';
import { DOTS, usePagination } from './usePagination';

type PaginatorPropsType = {
  title: string;
  currentPage: number | string;
  onPageChange: (currentPage: number | string) => void;
  onPageSizeChange: (pageSize: number) => void;
  totalCount: number;
  siblingCount: number;
  pageSize: number;
};

export const Paginator: FC<PaginatorPropsType> = (props: PaginatorPropsType) => {
  const {
    currentPage,
    onPageChange,
    onPageSizeChange,
    totalCount,
    siblingCount,
    pageSize,
    title,
  } = props;
  const isLoading = useAppSelector(state => state.app.isLoading);

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const pageSizeRange = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  const onNext = (): void => {
    if (!isLoading) onPageChange(Number(currentPage) + 1);
  };
  const onPrevious = (): void => {
    if (!isLoading) onPageChange(Number(currentPage) - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  const finalPageStyle = (pageNumber: number | string): any => {
    return `${isLoading && s.disabled} ${s.paginationItem} ${
      currentPage === pageNumber && s.selectedPage
    }`;
  };
  const finalListPagesStyle = `${s.paginationItem} ${s.listPages}`;
  const finalDotsStyle = `${s.paginationItem}  ${s.dots}`;
  const range = pageSize * Number(currentPage);
  const finalListPages =
    totalCount === 1
      ? `${totalCount} of ${totalCount} ${title}`
      : `${range - (pageSize - 1)}-${
          // eslint-disable-next-line no-nested-ternary
          totalCount > 4 ? (range > totalCount ? totalCount : range) : totalCount
        } 
        of ${totalCount} ${title}s`;
  const finalArrowsStyle = `${isLoading && s.disabled} ${s.arrow}`;

  return (
    <div className={s.paginationContainer}>
      <div className={finalListPagesStyle}>{finalListPages}</div>
      <div className={s.pagesContainer}>
        <div className={s.paginationItem}>
          {currentPage === 1 ? (
            <img src={arrowLeftGrey} alt="prev" className={finalArrowsStyle} />
          ) : (
            <img
              aria-hidden="true"
              src={arrowLeftBlue}
              alt="prev"
              onClick={onPrevious}
              className={finalArrowsStyle}
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
            <span
              aria-hidden="true"
              key={paginationRange[i]}
              className={finalPageStyle(pageNumber)}
              onClick={() => !isLoading && onPageChange(pageNumber)}
            >
              {pageNumber}
            </span>
          );
        })}
        <div className={s.paginationItem}>
          {currentPage === lastPage ? (
            <img src={arrowRightGrey} alt="next" className={finalArrowsStyle} />
          ) : (
            <img
              aria-hidden="true"
              src={arrowRightBlue}
              alt="next"
              onClick={onNext}
              className={finalArrowsStyle}
            />
          )}
        </div>
      </div>
      <SuperSelect
        options={pageSizeRange}
        value={pageSize}
        onChangeOption={onPageSizeChange}
        className={`${isLoading && s.disabled}`}
      />
    </div>
  );
};
