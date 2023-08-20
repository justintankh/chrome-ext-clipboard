import * as React from "react";

export function usePageNumber(props: {
  canPreviousPage: boolean;
  canNextPage: boolean;
  hasResults: boolean;
}) {
  const FIRST_PAGE = 1;
  const { canPreviousPage, canNextPage, hasResults } = props;
  const [pageNumber, setPageNumber] = React.useState(FIRST_PAGE);

  React.useEffect(() => {
    /* When state is inbetween dependancy logic, and previous page toggle */
    if (pageNumber === 2) return;
    setPageNumber(FIRST_PAGE);
  }, [canPreviousPage]);

  React.useEffect(() => {
    /* When state has no data */
    if (!canPreviousPage && !canNextPage) {
      if (hasResults) {
        setPageNumber(FIRST_PAGE);
        return;
      }
      setPageNumber(0);
    }
  }, [canNextPage]);

  //   React.useEffect(() => {
  //     /* When state has no data */
  //     if (pageNumber === 1) return;
  //     setPageNumber(0);
  //   }, [hasResults]);

  return { pageNumber, setPageNumber };
}
