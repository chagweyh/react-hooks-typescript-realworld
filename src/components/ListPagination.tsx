import React from 'react';
import { ArticleListAction } from '../reducers/articleList';

type ListPaginationProps = {
  page: number;
  articlesCount: number;
  dispatch: React.Dispatch<ArticleListAction>;
};

export default function ListPagination({
  page,
  articlesCount,
  dispatch,
}: ListPaginationProps) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(articlesCount / 10); ++i) {
    pageNumbers.push(i);
  }

  if (articlesCount <= 10) {
    return null;
  }

  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map((number) => {
          const isCurrent = number === page;
          return (
            <li
              className={isCurrent ? 'page-item active' : 'page-item'}
              onClick={() => dispatch({ type: 'SET_PAGE', page: number })}
              key={number}
            >
              <button className="page-link">{number + 1}</button>
            </li>
          );
        })}
      </div>
    </nav>
  );
}
