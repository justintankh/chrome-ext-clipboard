import React, { useEffect, useMemo } from "react";
import { TableContextType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { TableReducerActionType, TableStore } from "../reducer/types";
import { useTableData } from "../../hooks/useTableData";
import { getUniqueCategoriesTableData } from "../../Table/helpers";

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

  const filter = useSelector<TableStore, TableStore["filter"]>(
    (state) => state.filter
  );
  const filteredTableDate = tableData.filter(
    (row) => !filter.includes(row.category)
  );

  const contextValues: TableContextType = {
    states: {
      isLoaded,
      tableData: filteredTableDate,
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
