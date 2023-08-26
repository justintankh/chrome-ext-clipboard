import React, { useEffect } from "react";
import { TableContextType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { TableStore } from "../reducer/types";
import { useTableData } from "../../hooks/useTableData";

export const TableContext = React.createContext<TableContextType>({} as any);

export const TableContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [showId, setShowId] = React.useState<number>(-1);

  const dispatch = useDispatch();

  const selectedRows = useSelector<TableStore, TableStore["selectedRows"]>(
    (state) => state.selectedRows
  );

  const tableData = useSelector<TableStore, TableStore["tableData"]>(
    (state) => state.tableData
  );

  const {
    tableData: localTableData,
    isLocalData,
    addData,
    removeData,
  } = useTableData();

  // useEffect(() => {}, [
  //   /* To sync with local data */
  //   tableData,
  // ]);

  const contextValues: TableContextType = {
    states: {
      isLocalData,
      localTableData,
    },
    methods: {
      addData,
      removeData,
    },
  };

  return (
    <TableContext.Provider value={contextValues}>
      {children}
    </TableContext.Provider>
  );
};
