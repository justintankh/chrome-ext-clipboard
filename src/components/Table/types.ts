import { ColumnDef } from "@tanstack/react-table";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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
