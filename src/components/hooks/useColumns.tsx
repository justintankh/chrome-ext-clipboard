import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownWideNarrow, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableData } from "../Table/helpers";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { TableReducerActionType, TableStore } from "../data/reducer/types";

export const useColumns = () => {
  const dispatch = useDispatch();
  const categories = useSelector<TableStore, TableStore["categories"]>(
    (state) => state.categories
  );
  const categoriesFilter = useSelector<TableStore, TableStore["filter"]>(
    (state) => state.filter
  );

  const columns: ColumnDef<TableData>[] = [
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Category
                <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={"fontWhite backgroundColour"}
              align="center"
            >
              {categories.map((cat) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={cat}
                    checked={!categoriesFilter.includes(cat)}
                    className={
                      false
                        ? "editColumnMenuItem-disabled"
                        : "editColumnMenuItem-active"
                    }
                    onCheckedChange={(_) => {
                      const newFilter = categoriesFilter.includes(cat)
                        ? categoriesFilter.filter((e) => e !== cat)
                        : [...categoriesFilter, cat];
                      console.log({ newFilter });
                      dispatch({
                        type: TableReducerActionType.SET_FILTER,
                        payload: newFilter,
                      });
                    }}
                  >
                    {cat}
                  </DropdownMenuCheckboxItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: "tag",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tag
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "value",
      header: () => <div className="text-right">Value</div>,
      cell: ({ row }) => {
        const value = row.getValue("value").toString();
        return <div className="text-left font-medium">{value}</div>;
      },
    },
  ];

  return columns;
};
