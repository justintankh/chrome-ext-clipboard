import React from "react";
import { TableContextType } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { TableReducerState } from "../reducer/types";
import { useTableData } from "../../hooks/useTableData";

export const TableContext = React.createContext<TableContextType>({} as any);

export const TableContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [showId, setShowId] = React.useState<number>(-1);

  const dispatch = useDispatch();
  const selectedRows = useSelector<
    TableReducerState,
    TableReducerState["selectedRows"]
  >((state) => state.selectedRows);

  const { localTableData, isLocalData, addData, removeData } = useTableData();

  // useEffect(() => {
  //   dispatch({
  //     type: ReducerActionType.ADD_ROW,
  //     payload: filteredPokemon(pokemonList, search),
  //   });
  // }, [
  //   /* For state to set on load */
  //   pokemonList,
  //   /* For lazy loading to update */
  //   slice,
  //   /* For text filtered pokemon to update */
  //   search,
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
