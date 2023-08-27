import { Input } from "@/components/ui/input";

import { Table } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  FocusInput,
  TableReducerActionType,
  TableStore,
} from "../../data/reducer/types";

export type SearchInputProps<T> = {
  table: Table<T>;
  disableCommandText?: boolean;
};

export function SearchInput<T>(props: SearchInputProps<T>) {
  const dispatch = useDispatch();
  const focusInput = useSelector<TableStore, TableStore["focusInput"]>(
    (state) => state.focusInput
  );
  const { table, disableCommandText } = props;
  return (
    <Input
      id="filter-input"
      placeholder={
        disableCommandText || focusInput === FocusInput.Filter
          ? "Filter tags..."
          : "Filter tags... [CMD + F]"
      }
      value={(table.getColumn("tag")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("tag")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
      onFocus={() =>
        dispatch({
          type: TableReducerActionType.SET_FOCUS,
          payload: FocusInput.Filter,
        })
      }
      onBlur={() =>
        dispatch({
          type: TableReducerActionType.SET_FOCUS,
          payload: FocusInput.null,
        })
      }
      autoFocus={focusInput === FocusInput.Filter}
    />
  );
}
