import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePageNumber } from "../../hooks/usePageNumber";
import { MoreVertical, PencilLine, Save } from "lucide-react";
import { DataTableProps, clearSelected, isSomeRowSelected } from "../helpers";
import { useCustomTable } from "../../hooks/useCustomTable";
import { useDispatch } from "react-redux";
import { MODE, TableReducerActionType } from "../../data/reducer/types";

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch();
  const { table } = useCustomTable({ columns, data });

  const { pageNumber, updatePageNumber } = usePageNumber({
    canNextPage: table.getCanNextPage(),
    canPreviousPage: table.getCanPreviousPage(),
    hasResults: table.getRowModel().rows?.length > 0,
  });

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter tags..."
          value={(table.getColumn("tag")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tag")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
          autoFocus
        />

        <Button
          variant="outline"
          className="ml-5"
          onClick={() => {
            dispatch({
              type: TableReducerActionType.SET_MODE,
              payload: MODE.DISPLAY,
            });
          }}
        >
          <Save className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-2">
              <span className="mr-2">Options</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className={"fontWhite backgroundColour"}
            align="center"
          >
            <DropdownMenuCheckboxItem
              key={1}
              checked={false}
              disabled={!isSomeRowSelected(table)}
              className={
                !isSomeRowSelected(table)
                  ? "editColumnMenuItem-disabled"
                  : "editColumnMenuItem-active"
              }
              onCheckedChange={(value) => {
                // TODO : Implement deletion
              }}
            >
              {"⭐️ Add"}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              key={1}
              checked={false}
              disabled={!isSomeRowSelected(table)}
              className={
                !isSomeRowSelected(table)
                  ? "editColumnMenuItem-disabled"
                  : "editColumnMenuItem-active"
              }
              onCheckedChange={(value) => {
                // TODO : Implement deletion
              }}
            >
              {"⭐️ Remove"}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              key={1}
              checked={false}
              disabled={!isSomeRowSelected(table)}
              className={
                !isSomeRowSelected(table)
                  ? "editColumnMenuItem-disabled"
                  : "editColumnMenuItem-active"
              }
              onCheckedChange={(value) => {
                // TODO : Implement deletion
              }}
            >
              {"❌ Delete"}
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              key={1}
              checked={false}
              disabled={false}
              className={"editColumnMenuItem-active"}
              onCheckedChange={(_) => {
                clearSelected(table);
              }}
            >
              {"⃠ Select"}
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-red-200 cursor-pointer"
                  onClick={() => {
                    row.toggleSelected(!row.getIsSelected());
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
        <div className="twoColumnGrid">
          <div className="flex items-center justify-start space-x-2 py-4 pl-2">
            Total {table.getFilteredRowModel().rows.length} record(s), Page{" "}
            {pageNumber} of {table.getPageCount()}
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updatePageNumber((prev) => prev - 1);
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updatePageNumber((prev) => prev + 1);
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
