import { TableData } from "@root/src/components/Table/helpers";
import {
  BaseStorage,
  createStorage,
  StorageType,
} from "@src/shared/storages/base";

type ThemeStorage = BaseStorage<TableData[]>;

const storage = createStorage<TableData[]>("table-data-key", [], {
  storageType: StorageType.Local,
});

const tableDataStorage: ThemeStorage = {
  ...storage,
  // TODO: extends your own methods
};

export default tableDataStorage;
