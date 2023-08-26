import * as React from "react";
import { useTableData } from "../hooks/useTableData";

const ImportExportPage: React.FC = () => {
  const { handleImportData, handleClearData, handleExportData, isLocalData } =
    useTableData();

  const dataType = `{
      id: string;
      category: string;
      tag: string;
      value: string;
    }`;

  return (
    <div className="twoRowGrid">
      <div className="container text-lime-400">
        Options: Json to be in `{dataType}[]` format
      </div>
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
