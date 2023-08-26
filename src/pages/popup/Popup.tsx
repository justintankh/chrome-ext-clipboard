import { useContext } from "react";
import "@pages/popup/Popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";
import withSuspense from "@src/shared/hoc/withSuspense";
import TableStoreProvider from "@root/src/components/data/provider";
import DisplayTable from "@root/src/components/Table/DisplayTable/page";
import EditTable from "@root/src/components/Table/EditTable/page";
import { useSelector } from "react-redux";
import {
  MODE,
  TableReducerState,
} from "@root/src/components/data/reducer/types";
import { TableContext } from "@root/src/components/data/context";
import ImportExportPage from "@root/src/components/Options/page";

const RenderTable = () => {
  const mode = useSelector<TableReducerState, TableReducerState["mode"]>(
    (state) => state.mode
  );

  const {
    states: { isLocalData },
  } = useContext(TableContext);

  return (
    <>
      {!isLocalData && <div>Loading...</div>}
      {!isLocalData && <ImportExportPage />}
      {isLocalData && mode === MODE.DISPLAY ? <DisplayTable /> : <EditTable />}
    </>
  );
};

const Popup = () => {
  const theme = useStorage(exampleThemeStorage);
  return (
    <div className="App">
      <TableStoreProvider>
        <RenderTable />
      </TableStoreProvider>
    </div>
  );
};

export default withSuspense(Popup);
