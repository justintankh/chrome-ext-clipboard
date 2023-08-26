import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { flexRender } from "@tanstack/react-table";

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
import { Download, MoreVertical, Save, Upload } from "lucide-react";
import { DataTableProps, clearSelected, isAnyRowSelected } from "../helpers";
import { useCustomTable } from "../../hooks/useCustomTable";
import { useDispatch, useSelector } from "react-redux";
import {
  FocusInput,
  Mode,
  TableReducerActionType,
  TableStore,
} from "../../data/reducer/types";
import { useEditRow } from "./useEditRow";

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch();
  const currentFocus = useSelector<TableStore, TableStore["focusInput"]>(
    (state) => state.focusInput
  );
  const { table } = useCustomTable({ columns, data });
  const { RenderEditRow, onDelete } = useEditRow(table);

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
          onFocus={() => {
            dispatch({
              type: TableReducerActionType.SET_FOCUS,
              payload: FocusInput.Filter,
            });
          }}
          autoFocus={currentFocus === FocusInput.Filter}
        />

        {/* Download button */}
        <Button
          variant="outline"
          className="ml-5"
          onClick={() => {
            dispatch({
              type: TableReducerActionType.SET_MODE,
              payload: Mode.Display,
            });
          }}
        >
          <Upload className="h-4 w-4" />
        </Button>

        {/* Upload button */}
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => {
            dispatch({
              type: TableReducerActionType.SET_MODE,
              payload: Mode.Display,
            });
          }}
        >
          <Download className="h-4 w-4" />
        </Button>

        {/* Return back to Display Table */}
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => {
            dispatch({
              type: TableReducerActionType.SET_MODE,
              payload: Mode.Display,
            });
          }}
        >
          <Save className="h-4 w-4" />
        </Button>

        {/* Options dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={isAnyRowSelected(table) ? "ml-2 bg-red-200" : "ml-2"}
            >
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
              disabled={!isAnyRowSelected(table)}
              className={
                !isAnyRowSelected(table)
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
              disabled={!isAnyRowSelected(table)}
              className={
                !isAnyRowSelected(table)
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
              disabled={!isAnyRowSelected(table)}
              className={
                !isAnyRowSelected(table)
                  ? "editColumnMenuItem-disabled"
                  : "editColumnMenuItem-active"
              }
              onCheckedChange={(value) => {
                // TODO : Implement deletion
                onDelete();
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
            <RenderEditRow />
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
                    <>
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    </>
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
