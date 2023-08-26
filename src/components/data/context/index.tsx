import React, { useEffect } from "react";
import { TableContextType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { TableStore } from "../reducer/types";
import { useTableData } from "../../hooks/useTableData";

export const TableContext = React.createContext<TableContextType>({} as any);

export const TableContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const {
    tableData,
    isLoaded,
    addData,
    removeData,
    handleImportData,
    handleExportData,
  } = useTableData();

  // useEffect(() => {}, [
  //   /* To sync with local data */
  //   tableData,
  // ]);

  const contextValues: TableContextType = {
    states: {
      isLoaded,
      tableData,
    },
    methods: {
      addData,
      removeData,
      handleImportData,
      handleExportData,
    },
  };

  return (
    <TableContext.Provider value={contextValues}>
      {children}
    </TableContext.Provider>
  );
};
