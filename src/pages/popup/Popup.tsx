import "@pages/popup/Popup.css";
import useStorage from "@src/shared/hooks/useStorage";
import exampleThemeStorage from "@src/shared/storages/exampleThemeStorage";
import withSuspense from "@src/shared/hoc/withSuspense";
import TableStoreProvider from "@root/src/components/data/provider";
import DisplayTable from "@root/src/components/Table/DisplayTable/page";
import EditTable from "@root/src/components/Table/EditTable/page";
import { useSelector } from "react-redux";
import { Mode, TableStore } from "@root/src/components/data/reducer/types";

const RenderTable = () => {
  const mode = useSelector<TableStore, TableStore["mode"]>(
    (state) => state.mode
  );

  return <>{mode === Mode.Display ? <DisplayTable /> : <EditTable />}</>;
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
