import { Row } from "@tanstack/react-table";
import { Table } from "@tanstack/table-core";
import { TableData } from "./types";
import { KeyPress } from "./const";

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

export function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
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

export function getRowIdValue<T>(row: Row<T>): string {
  return (row.original as TableData).id;
}

export function onUpDownKeyPress(e: KeyboardEvent) {
  // Initializing number of rows that are displayed
  const elements = document.getElementsByClassName("table-row");
  const numberOfRows = elements.length;
  var currentFocus = getCurrentTableRow(elements);
  const prevFocus = getCurrentTableRow(elements);

  // Prevent default arrow keys
  if (e.key === KeyPress.DOWN || e.key === KeyPress.UP) {
    e.preventDefault();
    // If no row renders, do nothing
    if (numberOfRows === 0) return;
    if (currentFocus === null) currentFocus = 0;
  }

  // Initial focus
  if (currentFocus === null && numberOfRows) {
    if (e.key === KeyPress.DOWN) (elements[0] as HTMLElement).focus();
    if (e.key === KeyPress.UP)
      (elements[numberOfRows - 1] as HTMLElement).focus();
    return;
  }

  // Move focus up
  if (e.key === KeyPress.UP) {
    console.log({ before: currentFocus });
    currentFocus = prevFocus === 0 ? numberOfRows - 1 : prevFocus - 1;
    console.log({ after: currentFocus });
  }
  // Move focus down
  if (e.key === KeyPress.DOWN) {
    console.log({ before: currentFocus });
    currentFocus = prevFocus === numberOfRows - 1 ? 0 : prevFocus + 1;
    console.log({ after: currentFocus });
  }

  // Set focus
  if (e.key === KeyPress.DOWN || e.key === KeyPress.UP) {
    (elements[currentFocus] as HTMLElement).focus();
  }
}

export function onEnterKeyPress(e: KeyboardEvent) {
  const elements = document.getElementsByClassName("table-row");
  const prevFocus = getCurrentTableRow(elements);

  if (prevFocus === null) return;

  // Prevent default for Enter when any row is focused
  if (e.key === KeyPress.ENTER) {
    e.preventDefault();
    (elements[prevFocus] as HTMLElement).click();
    setTimeout(() => window.close(), 100);
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
  if (e.key === KeyPress.LEFT) {
    e.preventDefault();
    leftButton?.click();
    setTimeout(() => (elements[nextToFocus] as HTMLElement).focus(), 50);
  }
  if (e.key === KeyPress.RIGHT) {
    e.preventDefault();
    rightButton?.click();
    setTimeout(() => (elements[nextToFocus] as HTMLElement).focus(), 50);
  }
}

export function onSearchCommand(e: KeyboardEvent) {
  if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    document.getElementById("filter-input").focus();
  }
}
