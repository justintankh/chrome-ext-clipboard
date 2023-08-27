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
    if (keyPressed !== KeyPress.ENTER) return;

    switch (currentFocus) {
      case FocusInput.Category:
        // If pressed enter at Category, set focus to value
        dispatch({
          type: TableReducerActionType.SET_FOCUS,
          payload: FocusInput.Tag,
        });
        break;
      case FocusInput.Tag:
        // If pressed enter at tag, set focus to value
        dispatch({
          type: TableReducerActionType.SET_FOCUS,
          payload: FocusInput.Value,
        });
        break;
      case FocusInput.Value:
        addData(data);
        setData(initialData);
        // If entered at value, set focus to category
        dispatch({
          type: TableReducerActionType.SET_FOCUS,
          payload: FocusInput.Category,
        });
        break;
      case FocusInput.Filter:
      case FocusInput.null:
        return;
    }
  }

  const RerenderSuggestiveInput = useMemo(
    () => (
      <SuggestiveInput
        id={FocusInput.Category}
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
        onSelected={() => {
          onSubmit(KeyPress.ENTER);
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
          id={FocusInput.Tag}
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
          id={FocusInput.Value}
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
