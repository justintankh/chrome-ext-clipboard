import * as React from "react";
import tableDataStorage from "@root/src/shared/storages/tableDataStorage";
import { TableData } from "../../TableData/columns";
import { useLoadTableData } from "../hooks/useLoadTableData";

const ImportExportPage: React.FC = () => {
  const { handleImportData, handleClearData, handleExportData, isLocalData } =
    useLoadTableData();

  return (
    <div className="twoRowGrid">
      <div className="container text-lime-400">Options</div>
      <div className="threeColumnGrid">
        <input
          name="import-input"
          className="button"
          type="file"
          onChange={handleImportData}
        />
        <button
          className="button"
          disabled={!isLocalData}
          onClick={handleClearData}
        >
          Clear local Storage
        </button>
        <button
          className="button"
          disabled={!isLocalData}
          onClick={handleExportData}
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default ImportExportPage;
