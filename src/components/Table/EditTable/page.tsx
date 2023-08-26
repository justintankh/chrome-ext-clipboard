import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext } from "react";
import { TableContext } from "../../data/context";

function EditTable() {
  const {
    states: { tableData: localTableData },
  } = useContext(TableContext);

  return (
    <div className="fontWhite">
      <div className="infoBlock"></div>
      <DataTable columns={columns} data={localTableData} />
    </div>
  );
}

export default EditTable;
