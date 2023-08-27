import { Table } from "@tanstack/react-table";
import * as React from "react";
import { Button } from "../ui/button";

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

  const RenderButtons = () => (
    <div className="twoColumnGrid">
      <div className="flex items-center justify-start space-x-2 py-4 pl-2">
        Total {table.getFilteredRowModel().rows.length} record(s), Page{" "}
        {resolvedPageNumber} of {table.getPageCount()}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          id="prev-page-button"
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          id="next-page-button"
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );

  return {
    pageNumber: resolvedPageNumber,
    handleNextPage,
    handlePrevPage,
    RenderButtons,
  };
}
