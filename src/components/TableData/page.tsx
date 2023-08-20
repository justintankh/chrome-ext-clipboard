import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useLoadTableData } from "../data/hooks/useLoadTableData";
import ImportExportPage from "../data/Options/page";

export default function DemoPage() {
  // const [tableData, setTableData] = useState<TableData[] | null>(null);
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
