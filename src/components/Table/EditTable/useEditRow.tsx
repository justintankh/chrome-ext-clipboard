import { Table } from "@tanstack/react-table";
import { TableCell, TableRow } from "../../ui/table";
import { Input } from "../../ui/input";
import { useContext, useState } from "react";
import {
  FocusInput,
  TableDataNoId,
  TableReducerActionType,
  TableStore,
} from "../../data/reducer/types";
import { TableContext } from "../../data/context";
import { TableData } from "../helpers";
import { Plus, PlusSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

export function useEditRow<T>(table: Table<T>) {
  const initialData: TableDataNoId = {
    category: "",
    tag: "",
    value: "",
  };

  const [data, setData] = useState<TableDataNoId>(initialData);

  const {
    methods: { addData, removeData },
  } = useContext(TableContext);

  const dispatch = useDispatch();
  const currentFocus = useSelector<TableStore, TableStore["focusInput"]>(
    (state) => state.focusInput
  );

  function onSubmit(keyPressed: string) {
    if (keyPressed === "Enter") {
      addData(data);
      setData(initialData);
    }
    // If entered at value, set focus to category
    if (keyPressed === "Enter" && currentFocus === FocusInput.Value) {
      dispatch({
        type: TableReducerActionType.SET_FOCUS,
        payload: FocusInput.Category,
      });
    }
  }

  function onDelete() {
    const selectedId = table
      .getSelectedRowModel()
      .rows.map((row) => (row.original as TableData).id);

    removeData(selectedId);
  }

  const RenderEditRow = () => (
    <TableRow>
      <TableCell>
        <PlusSquare className="text-green-600 h-4 w-4" />
      </TableCell>
      <TableCell>
        <Input
          placeholder="Category..."
          value={data.category}
          onChange={(event) =>
            setData((prev) => ({ ...prev, category: event.target.value }))
          }
          className="max-w-sm"
          onKeyDown={(event) => {
            onSubmit(event.key);
          }}
          onFocus={() =>
            dispatch({
              type: TableReducerActionType.SET_FOCUS,
              payload: FocusInput.Category,
            })
          }
          autoFocus={currentFocus === FocusInput.Category}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="tags..."
          value={data.tag}
          onChange={(event) =>
            setData((prev) => ({ ...prev, tag: event.target.value }))
          }
          className="max-w-sm"
          onKeyDown={(event) => {
            onSubmit(event.key);
          }}
          onFocus={() =>
            dispatch({
              type: TableReducerActionType.SET_FOCUS,
              payload: FocusInput.Tag,
            })
          }
          autoFocus={currentFocus === FocusInput.Tag}
        />
      </TableCell>
      <TableCell>
        <Input
          placeholder="value..."
          value={data.value}
          onChange={(event) =>
            setData((prev) => ({ ...prev, value: event.target.value }))
          }
          className="max-w-sm"
          onKeyDown={(event) => {
            onSubmit(event.key);
          }}
          onFocus={() =>
            dispatch({
              type: TableReducerActionType.SET_FOCUS,
              payload: FocusInput.Value,
            })
          }
          autoFocus={currentFocus === FocusInput.Value}
        />
      </TableCell>
    </TableRow>
  );

  return {
    RenderEditRow,
    onDelete,
  };
}
