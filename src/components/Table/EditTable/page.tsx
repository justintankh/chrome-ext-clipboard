import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext, useEffect } from "react";
import { TableContext } from "../../data/context";
import { useColumns } from "../../hooks/useColumns";
import { onLeftRightKeyPress, onSearchCommand } from "../helpers";

function EditTable() {
  const {
    states: { tableData: localTableData },
  } = useContext(TableContext);

  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      onLeftRightKeyPress(e);
      onSearchCommand(e);
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
