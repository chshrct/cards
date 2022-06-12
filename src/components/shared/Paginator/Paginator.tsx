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

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const one = 1;
  const four = 4;
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const pageSizeRange = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

  const onNext = (): void => {
    if (!isLoading) onPageChange(Number(currentPage) + one);
  };
  const onPrevious = (): void => {
    if (!isLoading) onPageChange(Number(currentPage) - one);
  };

  const lastPage = paginationRange[paginationRange.length - one];
  const finalPageStyle = (pageNumber: number | string): any => {
    return `${isLoading && s.disabled} ${s.paginationItem} ${
      currentPage === pageNumber && s.selectedPage
    }`;
  };
  const finalListPagesStyle = `${s.paginationItem}  ${s.listPages}`;
  const finalDotsStyle = `${s.paginationItem}  ${s.dots}`;
  const range = pageSize * Number(currentPage);
  const finalListPages =
    totalCount === one
      ? `${totalCount} of ${totalCount} ${title}`
      : `${range - (pageSize - one)}-${
          // eslint-disable-next-line no-nested-ternary
          totalCount > four ? (range > totalCount ? totalCount : range) : totalCount
        } 
        of ${totalCount} ${title}s`;
  const finalArrowsStyle = `${isLoading && s.disabled} ${s.arrow}`;
  return (
    <div className={s.paginationContainer}>
      <div className={finalListPagesStyle}>{finalListPages}</div>
      <div className={s.pagesContainer}>
        <div className={s.paginationItem}>
          {currentPage === one ? (
            <img src={arrowLeftGrey} alt="prev" className={finalArrowsStyle} />
          ) : (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <img
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
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <span
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
            <img src={arrowRightGrey} alt="next" className={s.arrow} />
          ) : (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
            <img src={arrowRightBlue} alt="next" onClick={onNext} className={s.arrow} />
          )}
        </div>
      </div>
      <SuperSelect
        options={pageSizeRange}
        value={pageSize}
        onChangeOption={onPageSizeChange}
      />
    </div>
  );
};
