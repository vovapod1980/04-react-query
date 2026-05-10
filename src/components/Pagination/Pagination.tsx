import css from "./Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  forcePage: number;
  onPageChange: (event: { selected: number }) => void;
  nextLabel: string;
  previousLabel: string;
}

export default function Pagination({
  pageCount,
  forcePage,
  onPageChange,
  nextLabel,
  previousLabel,
}: PaginationProps) {
  const currentPage = forcePage + 1;

  return (
    <ul className={css.pagination}>
      <li>
        <button
          className={css.pageButton}
          disabled={currentPage === 1}
          onClick={() => onPageChange({ selected: forcePage - 1 })}
        >
          {previousLabel}
        </button>
      </li>

      {Array.from({ length: pageCount }, (_, i) => i + 1)
        // Показуємо лише першу, останню та сусідні сторінки, щоб список не був занадто довгим
        .filter(
          (p) => p === 1 || p === pageCount || Math.abs(p - currentPage) <= 2,
        )
        .map((p, index, arr) => {
          const pageIndex = p - 1;
          return (
            <g key={p}>
              {index > 0 && arr[index - 1] !== p - 1 && (
                <li className={css.break}>...</li>
              )}
              <li className={currentPage === p ? css.active : ""}>
                <button
                  className={css.pageButton}
                  onClick={() => onPageChange({ selected: pageIndex })}
                >
                  {p}
                </button>
              </li>
            </g>
          );
        })}

      <li>
        <button
          className={css.pageButton}
          disabled={currentPage === pageCount}
          onClick={() => onPageChange({ selected: forcePage + 1 })}
        >
          {nextLabel}
        </button>
      </li>
    </ul>
  );
}
