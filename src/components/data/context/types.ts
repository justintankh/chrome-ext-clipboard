import { TableData } from "../../Table/helpers";
import { TableDataNoId } from "../reducer/types";

export type TableContextType = {
  states: {
    isLocalData: boolean;
    localTableData: TableData[];
  };
  methods: {
    addData: (value: TableDataNoId) => void;
    removeData: (idList: string[]) => void;
  };
};
