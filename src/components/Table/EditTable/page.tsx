import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useContext } from "react";
import { TableContext } from "../../data/context";
import { useColumns } from "../../hooks/useColumns";

function EditTable() {
  const {
    states: { tableData: localTableData },
  } = useContext(TableContext);

  const columnsWithFilter = useColumns();
  const resolvedColumn = [columns[0], ...columnsWithFilter];

  return (
    <div className="fontWhite">
      <div className="infoBlock"></div>
      <DataTable columns={resolvedColumn} data={localTableData} />
    </div>
  );
}

export default EditTable;
