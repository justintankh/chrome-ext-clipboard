import { Table } from "@tanstack/react-table";
import * as React from "react";

export function usePageNumber<T>(table: Table<T>) {
  const FIRST_PAGE = 1;
  const canPreviousPage = table.getCanPreviousPage();
  const hasResults = table.getRowModel().rows?.length > 0;

  const [pageNumber, setPageNumber] = React.useState(FIRST_PAGE);

  React.useEffect(() => {
    /* When state is inbetween dependancy logic, and previous page toggle */
    if (pageNumber === 2) return;
    setPageNumber(FIRST_PAGE);
  }, [canPreviousPage]);

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
    table.nextPage();
  };

  const handlePrevPage = () => {
    setPageNumber((prev) => prev - 1);
    table.previousPage();
  };

  const resolvedPageNumber = hasResults ? pageNumber : 0;
  return { pageNumber: resolvedPageNumber, handleNextPage, handlePrevPage };
}
