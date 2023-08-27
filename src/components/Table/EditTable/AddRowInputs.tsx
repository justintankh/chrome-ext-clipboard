import { TableCell, TableRow } from "../../ui/table";
import { Input } from "../../ui/input";
import { useContext, useMemo, useState } from "react";
import {
  FocusInput,
  TableDataNoId,
  TableReducerActionType,
  TableStore,
} from "../../data/reducer/types";
import { TableContext } from "../../data/context";
import { PlusSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SuggestiveInput } from "./SuggestiveInput";
import { KeyPress } from "../const";
import { toTitleCase } from "../helpers";

export function AddRowInputs() {
  const initialData: TableDataNoId = {
    category: "",
    tag: "",
    value: "",
  };

  const [data, setData] = useState<TableDataNoId>(initialData);

  const {
    methods: { addData },
  } = useContext(TableContext);

  const dispatch = useDispatch();
  const currentFocus = useSelector<TableStore, TableStore["focusInput"]>(
    (state) => state.focusInput
  );
  const categories = useSelector<TableStore, string[]>(
    (state) => state.categories
  );

  function onSubmit(keyPressed: string) {
    if (keyPressed === KeyPress.ENTER) {
      addData(data);
      setData(initialData);
    }
    // If entered at value, set focus to category
    if (keyPressed === KeyPress.ENTER && currentFocus === FocusInput.Value) {
      dispatch({
        type: TableReducerActionType.SET_FOCUS,
        payload: FocusInput.Category,
      });
    }
  }

  const RerenderSuggestiveInput = useMemo(
    () => (
      <SuggestiveInput
        value={data.category}
        categories={categories}
        onChange={(value) =>
          setData((prev) => ({ ...prev, category: toTitleCase(value) }))
        }
        onFocusHotkey={() => {
          dispatch({
            type: TableReducerActionType.SET_FOCUS,
            payload: FocusInput.Category,
          });
        }}
        autoFocus={currentFocus === FocusInput.Category}
      />
    ),
    [categories, currentFocus, data.category]
  );

  const AddRowInput = (
    <TableRow>
      <TableCell>
        <PlusSquare className="h-4 w-4 text-black-500" />
      </TableCell>
      <TableCell>{RerenderSuggestiveInput}</TableCell>
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

  function RerenderAddRowInput() {
    return AddRowInput;
  }
  return { RerenderAddRowInput, AddRowInput };
}
