import React from "react";
import cx from "classnames";
import usePaginate from "../../utils/usePaginate";

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props;
  const paginationRange = usePaginate({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={cx("pagination-container", { [className]: className })}>
      <li
        className={cx("pagination-item", {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <l className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "...") {
          return (
            <li className="pagination-item dots" key={index}>
              &#8230;
            </li>
          );
        }
        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className={cx("pagination-item", {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={cx("pagination-item", {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};
export default Pagination;
