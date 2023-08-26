import { Provider } from "react-redux";
import { useTableStore } from "../reducer";
import { TableContextProvider } from "../context";

const TableStoreService: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <>{children}</>;
};

export default ({ children }: { children: React.ReactNode }) => (
  <Provider store={useTableStore()}>
    <TableStoreService>
      <TableContextProvider>{children}</TableContextProvider>
    </TableStoreService>
  </Provider>
);
