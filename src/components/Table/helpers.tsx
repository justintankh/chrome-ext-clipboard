import { Row } from "@tanstack/react-table";
import { Table } from "@tanstack/table-core";
import { TableData } from "./types";

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
