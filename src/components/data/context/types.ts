import { TableData } from "../../Table/helpers";

export type TableContextType = {
  states: {
    isLocalData: boolean;
    localTableData: TableData[];
  };
  methods: {
    addData: (value: TableData) => void;
    removeData: (idList: string[]) => void;
  };
};
