import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useLoadTableData } from "../hooks/useLoadTableData";
import ImportExportPage from "../Options/page";

function PopupPage() {
  const { localTableData, isLocalData } = useLoadTableData();

  return (
    <div className="fontWhite">
      <div className="infoBlock"></div>
      {!isLocalData && <div>Loading...</div>}
      {!isLocalData && <ImportExportPage />}
      {isLocalData && <DataTable columns={columns} data={localTableData} />}
    </div>
  );
}

export default PopupPage;
