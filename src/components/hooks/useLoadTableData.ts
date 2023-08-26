import tableDataStorage from "@root/src/shared/storages/tableDataStorage";
import * as React from "react";
import { TableData } from "../TableData/columns";

export function useLoadTableData() {
  const [localTableData, setLocalTableData] = React.useState<TableData[]>([]);
  const isLocalData = localTableData && localTableData.length > 0;

  React.useEffect(() => {
    tableDataStorage.get().then((data) => {
      setLocalTableData(data);
    });
  }, []);

  async function handleClearData() {
    console.log("before: ", await tableDataStorage.get());
    tableDataStorage.set([]);
    setLocalTableData([]);
    console.log("after: ", await tableDataStorage.get());
  }

  const handleImportData = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("Uploaded result", e.target.result);

      try {
        const importedData = JSON.parse(
          e.target.result as string
        ) as TableData[];
        console.log({ importedData });

        tableDataStorage.set(importedData);
        setLocalTableData(importedData);
      } catch (error) {
        console.error({ error });
      }
    };
  };

  function handleExportData(e: any) {
    // create file in browser
    const fileName = "chrome_ext_data";
    const json = JSON.stringify(localTableData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  return {
    isLocalData,
    localTableData,
    handleClearData,
    handleImportData,
    handleExportData,
  };
}
