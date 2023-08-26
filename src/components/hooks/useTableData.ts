import tableDataStorage from "@root/src/shared/storages/tableDataStorage";
import * as React from "react";
import { TableData, sortByNewestFirst } from "../Table/helpers";
import { TableDataNoId } from "../data/reducer/types";

export function useTableData() {
  const [localTableData, setLocalTableData] = React.useState<TableData[]>([]);
  const isLocalData = localTableData && localTableData.length > 0;

  React.useEffect(
    () => {
      tableDataStorage.get().then((data) => {
        setLocalTableData(data);
      });
    },
    [
      // Load data from cache on mount
    ]
  );

  async function handleClearData() {
    console.log("before: ", await tableDataStorage.get());
    tableDataStorage.set([]);
    setLocalTableData([]);
    console.log("after: ", await tableDataStorage.get());
  }

  function handleImportData(e) {
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
  }

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

  function addData(value: TableDataNoId) {
    const newData = { ...value, id: Date.now().toString() };
    const newTableData = [...localTableData, newData];
    tableDataStorage.set(newTableData);
    setLocalTableData(newTableData);
  }

  function removeData(idList: string[]) {
    const newTableData = localTableData.filter(
      (item) => !idList.includes(item.id)
    );
    console.log({ idList, newTableData });
    tableDataStorage.set(newTableData);
    setLocalTableData(newTableData);
  }

  const tableData = localTableData.sort((a, b) =>
    sortByNewestFirst(a.id, b.id)
  );

  return {
    isLocalData,
    tableData,
    handleClearData,
    handleImportData,
    handleExportData,
    addData,
    removeData,
  };
}
