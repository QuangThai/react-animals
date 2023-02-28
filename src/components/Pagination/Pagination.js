import React, { useState } from "react";
import "./style.css";

function Pagination({ currentPage = 987, totalPage = 1000, onChangePage }) {
  const [page, setPage] = useState(currentPage);

  const getPaginationButtons = () => {
    if (totalPage === 0) return [];
    if (totalPage <= 4) {
      const pages = [...new Array(totalPage)].map((_, index) =>
        (index + 1).toString()
      );
      return pages;
    }

    const pages = [{ number: "1" }];

    if (page >= 4) {
      pages.push({ number: "...", pos: -1 });
    }

    if (page + 1 > totalPage) {
      pages.push({ number: (page - 2).toString() });
    }

    if (page - 1 > 1) {
      pages.push({ number: (page - 1).toString() });
    }

    if (page !== 1) {
      pages.push({ number: page.toString() });
    }

    if (page + 1 <= totalPage) {
      pages.push({ number: (page + 1).toString() });
    }

    if (page - 1 <= 0) {
      pages.push({ number: (page + 2).toString() });
    }

    if (page + 2 < totalPage) {
      pages.push({ number: "...", pos: 1 });
    }

    if (page + 1 < totalPage) {
      pages.push({ number: totalPage.toString() });
    }

    return pages;
  };

  const handleChangePage = (number, pos) => {
    if ([1, -1].includes(pos)) {
      setPage((prev) => prev + pos);
      return;
    }
    onChangePage(number);
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            disabled={currentPage === 1}
            className={`pagination__link ${
              page?.number === currentPage.toString() ? "active" : ""
            }`}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            <span> {`<`}</span>
          </button>
        </li>

        {getPaginationButtons().map((page, index) => (
          <li
            key={String(index)}
            onClick={() => handleChangePage(page?.number, page?.pos)}
            className="pagination__item"
          >
            <button
              href=""
              className={`pagination__link ${
                page?.number === currentPage.toString() ? "active" : ""
              }`}
            >
              {page?.number}
            </button>
          </li>
        ))}

        <li className="pagination__item">
          <button
            className={`pagination__link ${
              page?.number === currentPage.toString() ? "active" : ""
            }`}
            disabled={currentPage === totalPage}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            <span>{`>`}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
