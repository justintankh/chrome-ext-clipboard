import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { useContext, useEffect } from "react";
import { TableContext } from "../../data/context";
import { useColumns } from "../../hooks/useColumns";

import { useDispatch } from "react-redux";
import { Mode, TableReducerActionType } from "../../data/reducer/types";
import { onLeftRightKeyPress, onSearchCommand } from "../keyboardListeners";

function EditTable() {
  const dispatch = useDispatch();
  const {
    states: { tableData: localTableData },
  } = useContext(TableContext);

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      onLeftRightKeyPress(e);
      onSearchCommand(e);

      // Hotkey for Save
      ((e: KeyboardEvent) => {
        if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          dispatch({
            type: TableReducerActionType.SET_MODE,
            payload: Mode.Display,
          });
        }
      })(e);
    };

    // Bind the event listener
    document.addEventListener("keydown", keyDownListener);
    return () => document.removeEventListener("keydown", keyDownListener);
  }, []);

  const columnsWithFilter = useColumns();
  const resolvedColumn = [columns[0], ...columnsWithFilter];

  return (
    <div className="fontBlack">
      <div className="infoBlock"></div>
      <DataTable columns={resolvedColumn} data={localTableData} />
    </div>
  );
}

export default EditTable;
