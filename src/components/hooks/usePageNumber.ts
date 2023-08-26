import { Table } from "@tanstack/react-table";
import * as React from "react";

export function usePageNumber<T>(table: Table<T>) {
  const FIRST_PAGE = 1;
  const canNextPage = table.getCanNextPage();
  const canPreviousPage = table.getCanPreviousPage();
  const hasResults = table.getRowModel().rows?.length > 0;

  const [pageNumber, setPageNumber] = React.useState(FIRST_PAGE);

  React.useEffect(() => {
    /* When state is inbetween dependancy logic, and previous page toggle */
    if (pageNumber === 2) return;
    setPageNumber(FIRST_PAGE);
  }, [canPreviousPage]);

  // React.useEffect(() => {
  //   /* When state has no data */
  //   if (!canPreviousPage && !canNextPage) {
  //     if (hasResults) {
  //       setPageNumber(FIRST_PAGE);
  //     } else {
  //       setPageNumber(0);
  //     }
  //   }
  // }, [canNextPage]);

  return { pageNumber, updatePageNumber: setPageNumber };
}
