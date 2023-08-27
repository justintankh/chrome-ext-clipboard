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
import { Download, Save, Upload } from "lucide-react";
import { getRowIdValue } from "../helpers";
import { DataTableProps } from "../types";
import { useCustomTable } from "../../hooks/useCustomTable";
import { useDispatch } from "react-redux";
import { Mode, TableReducerActionType } from "../../data/reducer/types";
import { AddRowInputs } from "./AddRowInputs";
import { useContext, useRef } from "react";
import { TableContext } from "../../data/context";
import { Tooltip } from "react-tooltip";
import { SearchInput } from "../SearchInput";
import { DropDownOption } from "./DropDownOption";

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const dispatch = useDispatch();
  const {
    methods: { handleImportData, handleExportData },
    states: { tableData },
  } = useContext(TableContext);

  const { table } = useCustomTable({ columns, data });
  const { RenderButtons } = usePageNumber(table);
  const { RerenderAddRowInput } = AddRowInputs();

  const fileInputRef = useRef(null);

  return (
    <div>
      <div className="flex items-center py-4">
        {/* Tooltip label */}
        <Tooltip id="saveButtonToolTop"></Tooltip>
        <SearchInput table={table} disableCommandText={true} />

        {/* Upload button */}
        <input
          className="hidden"
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleImportData}
        />
        <Button
          data-tooltip-id="saveButtonToolTop"
          data-tooltip-content="Import (replace)"
          variant="outline"
          className="ml-5"
          onClick={() => fileInputRef.current.click()}
        >
          <Upload className="h-4 w-4" />
        </Button>

        {/* Download button */}
        <Button
          data-tooltip-id="saveButtonToolTop"
          data-tooltip-content="Export All"
          variant="outline"
          className="ml-2"
          onClick={handleExportData}
          disabled={!tableData.length}
        >
          <Download className="h-4 w-4" />
        </Button>

        {/* Return back to Display Table */}
        <Button
          data-tooltip-id="saveButtonToolTop"
          data-tooltip-content="CMD + S"
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
        <DropDownOption table={table} />
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
            <RerenderAddRowInput />
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={getRowIdValue(row)}
                  data-state={row.getIsSelected() && "selected"}
                  tabIndex={Number(row.id)}
                  id={`table-row-${row.id}`}
                  className={
                    "hover:bg-neutral-500 hover:text-white focus:outline-none cursor-grab select-none table-row " +
                    (row.getIsSelected() && "bg-neutral-500 text-white")
                  }
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
        <RenderButtons />
      </div>
    </div>
  );
}
