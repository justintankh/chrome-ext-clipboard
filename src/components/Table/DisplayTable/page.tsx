import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TableContext } from "../../data/context";
import { useContext } from "react";

function DisplayTable() {
  const {
    states: { localTableData },
  } = useContext(TableContext);

  return (
    <div className="fontWhite">
      <div className="infoBlock"></div>
      <DataTable columns={columns} data={localTableData} />
    </div>
  );
}

export default DisplayTable;
