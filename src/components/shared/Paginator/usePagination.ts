import { useMemo } from 'react';

export const DOTS = '...';

type PaginationType = {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
};

const one = 1;
const two = 2;
const three = 3;
const five = 5;
const range = (start: number, end: number): number[] => {
  const length = end - start + one;
  /*
        Create an array of certain length and set the elements within it from
      start value to end value.
    */
  return Array.from({ length }, (_, idx) => idx + start);
};
export const usePagination: any = ({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}: PaginationType) => {
  // eslint-disable-next-line consistent-return
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + five;
    /*
          Case 1:
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
    if (totalPageNumbers >= totalPageCount) {
      return range(one, totalPageCount);
    }

    /*
            Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
        */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, one);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    /*
          We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
        */
    const shouldShowLeftDots = leftSiblingIndex > two;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - two;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
            Case 2: No left dots to show, but rights dots to be shown
        */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = three + two * siblingCount;
      const leftRange = range(one, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
            Case 3: No right dots to show, but left dots to be shown
        */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = three + two * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + one, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
            Case 4: Both left and right dots to be shown
        */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
