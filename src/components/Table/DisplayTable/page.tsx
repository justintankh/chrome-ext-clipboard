import { DataTable } from "./data-table";
import { TableContext } from "../../data/context";
import { useContext, useEffect } from "react";
import { useColumns } from "../../hooks/useColumns";
import {
  onUpDownKeyPress,
  onEnterKeyPress,
  onLeftRightKeyPress,
  onSearchCommand,
} from "../helpers";

function DisplayTable() {
  const {
    states: { tableData: localTableData },
  } = useContext(TableContext);

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      onUpDownKeyPress(e);
      onEnterKeyPress(e);
      onLeftRightKeyPress(e);
      onSearchCommand(e);
    };

    // Bind the event listener
    document.addEventListener("keydown", keyDownListener);
    return () => document.removeEventListener("keydown", keyDownListener);
  }, []);

  return (
    <div className="fontBlack">
      <div className="infoBlock"></div>
      <DataTable columns={useColumns()} data={localTableData} />
    </div>
  );
}

export default DisplayTable;
