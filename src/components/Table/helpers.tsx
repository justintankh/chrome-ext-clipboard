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
  return table
    .getRowModel()
    .rows.map((row) => row.getValue("category") as string);
}
