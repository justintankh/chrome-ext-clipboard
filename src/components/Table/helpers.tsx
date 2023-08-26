// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { ColumnDef } from "@tanstack/react-table";
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

export function isSomeRowSelected<T>(table: Table<T>): boolean {
  return table.getIsSomeRowsSelected();
}

export function clearSelected<T>(table: Table<T>): void {
  return table.resetRowSelection();
}
