// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { ColumnDef, Row } from "@tanstack/react-table";
import { Table } from "@tanstack/table-core";

export type TableData = {
  id: string;
  category: string;
  tag: string;
  value: string;
};

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export function isAnyRowSelected<T>(table: Table<T>): boolean {
  return table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();
}

export function clearSelected<T>(table: Table<T>): void {
  return table.resetRowSelection();
}

export function handleRowOnClick<TData>(row: Row<TData>) {
  /*
   * 1. Copy value to clipboard
   * 2. Set selected row for copy popup
   * 3. Clear selected row after 1 second
   */
  navigator.clipboard.writeText(row.getValue("value"));

  row.toggleSelected(true);
  setTimeout(() => {
    row.toggleSelected(false);
  }, 500);
}

export function sortByNewestFirst(a: string, b: string) {
  return -a.localeCompare(b);
}

export function getUniqueCategories<T>(table: Table<T>): string[] {
  return Array.from(
    new Set(
      table
        .getCoreRowModel()
        .rows.map((row) => row.getValue("category") as string)
    )
  );
}

export function getUniqueCategoriesTableData<T>(data: TableData[]): string[] {
  return Array.from(new Set(data.map((data) => data.category)));
}

export function getCurrentTableRow(
  elements: HTMLCollectionOf<Element>
): number | null {
  if (!elements) return null;
  return ([...elements] as HTMLElement[]).findIndex(
    (element) => element.id === document.activeElement.id
  );
}

export function onUpDownKeyPress(e: KeyboardEvent) {
  // Initializing number of rows that are displayed
  const elements = document.getElementsByClassName("table-row");
  const numberOfRows = elements.length;
  var currentFocus = getCurrentTableRow(elements);
  const prevFocus = getCurrentTableRow(elements);

  // Prevent default arrow keys
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    // e.preventDefault();
    // If no row renders, do nothing
    if (numberOfRows === 0) return;
    if (currentFocus === null) currentFocus = 0;
  }

  // Initial focus
  if (
    (e.key === "ArrowDown" || e.key === "ArrowUp") &&
    currentFocus === null &&
    numberOfRows
  ) {
    (elements[0] as HTMLElement).focus();
    return;
  }

  // Move focus up
  if (e.key === "ArrowUp") {
    console.log({ before: currentFocus });
    currentFocus = prevFocus === 0 ? numberOfRows - 1 : prevFocus - 1;
    console.log({ after: currentFocus });
  }
  // Move focus down
  if (e.key === "ArrowDown") {
    console.log({ before: currentFocus });
    currentFocus = prevFocus === numberOfRows - 1 ? 0 : prevFocus + 1;
    console.log({ after: currentFocus });
  }

  // Set focus
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    (elements[currentFocus] as HTMLElement).focus();
  }
}

export function onEnterKeyPress(e: KeyboardEvent) {
  const elements = document.getElementsByClassName("table-row");
  const prevFocus = getCurrentTableRow(elements);

  if (prevFocus === null) return;

  // Prevent default for Enter when any row is focused
  if (e.key === "Enter") {
    e.preventDefault();
    (elements[prevFocus] as HTMLElement).click();
    window.close();
  }
}

export function onLeftRightKeyPress(e: KeyboardEvent) {
  const elements = document.getElementsByClassName("table-row");
  const prevFocus = getCurrentTableRow(elements);
  const nextToFocus = prevFocus > elements.length - 1 ? 0 : prevFocus;

  const leftButton = document.getElementById("prev-page-button");
  const rightButton = document.getElementById("next-page-button");

  if (prevFocus === null) return;

  // Prevent default for Enter when any row is focused
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    leftButton?.click();
    setTimeout(() => (elements[nextToFocus] as HTMLElement).focus(), 50);
  }
  if (e.key === "ArrowRight") {
    e.preventDefault();
    rightButton?.click();
    setTimeout(() => (elements[nextToFocus] as HTMLElement).focus(), 50);
  }
}
