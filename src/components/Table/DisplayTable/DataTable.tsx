import { Button } from "@/components/ui/button";

import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePageNumber } from "../../hooks/usePageNumber";
import { Pencil } from "lucide-react";
import { handleRowOnClick } from "../helpers";
import { DataTableProps } from "../types";
import { useCustomTable } from "../../hooks/useCustomTable";
import { useDispatch } from "react-redux";
import { Mode, TableReducerActionType } from "../../data/reducer/types";
import { SearchInput } from "../SearchInput";

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch();

  const { table } = useCustomTable({ columns, data });
  const { RenderButtons } = usePageNumber(table);

  return (
    <div>
      <div className="flex items-center py-4">
        <SearchInput table={table} />
        <Button
          variant="outline"
          className="ml-5"
          onClick={() => {
            dispatch({
              type: TableReducerActionType.SET_MODE,
              payload: Mode.Edit,
            });
          }}
        >
          <span className="mr-2">Edit</span>
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="copiedTextParent">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <>
                  {row.getIsSelected() && (
                    <div className={"copiedTextChild"}>Copied !</div>
                  )}
                  <TableRow
                    tabIndex={Number(row.id)}
                    id={`table-row-${row.id}`}
                    className="focus:bg-indigo-200 focus:outline-none cursor-grab select-none table-row"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() => {
                      handleRowOnClick(row);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <RenderButtons />
      </div>
    </div>
  );
}
