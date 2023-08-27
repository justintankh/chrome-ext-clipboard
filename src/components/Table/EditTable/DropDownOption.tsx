import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { getRowIdValue, isAnyRowSelected } from "../helpers";
import { Table } from "@tanstack/react-table";
import { TableContext } from "../../data/context";
import { useContext } from "react";

export type DropDownOptionProps<T> = {
  table: Table<T>;
};

export function DropDownOption<T>({ table }: DropDownOptionProps<T>) {
  const {
    methods: { removeData },
  } = useContext(TableContext);

  function onDelete() {
    const selectedId = table
      .getSelectedRowModel()
      .rows.map((row) => getRowIdValue(row));

    table.toggleAllRowsSelected(false);
    removeData(selectedId);
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={
              isAnyRowSelected(table)
                ? "ml-2 bg-neutral-500 text-white"
                : "ml-2"
            }
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className={"fontBlack backgroundColour"}
          align="center"
        >
          <DropdownMenuCheckboxItem
            key={1}
            checked={false}
            disabled={true}
            className={
              true ? "editColumnMenuItem-disabled" : "editColumnMenuItem-active"
            }
            onCheckedChange={() => {
              // TODO : Implement deletion
            }}
          >
            {"⭐️ Add"}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key={2}
            checked={false}
            disabled={true}
            className={
              true ? "editColumnMenuItem-disabled" : "editColumnMenuItem-active"
            }
            onCheckedChange={() => {
              // TODO : Implement deletion
            }}
          >
            {"⭐️ Remove"}
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            key={3}
            checked={false}
            disabled={!isAnyRowSelected(table)}
            className={
              !isAnyRowSelected(table)
                ? "editColumnMenuItem-disabled"
                : "editColumnMenuItem-active"
            }
            onCheckedChange={() => {
              onDelete();
            }}
          >
            {"❌ Delete"}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
