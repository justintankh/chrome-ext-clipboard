import { DataTable } from "./data-table";
import { TableContext } from "../../data/context";
import { useContext } from "react";
import { useColumns } from "../../hooks/useColumns";

function DisplayTable() {
  const {
    states: { tableData: localTableData },
  } = useContext(TableContext);

  return (
    <div className="fontWhite">
      <div className="infoBlock"></div>
      <DataTable columns={useColumns()} data={localTableData} />
    </div>
  );
}

export default DisplayTable;
