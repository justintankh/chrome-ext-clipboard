import { TableData } from "../../Table/helpers";
import { TableDataNoId } from "../reducer/types";

export type TableContextType = {
  states: {
    isLoaded: boolean;
    tableData: TableData[];
  };
  methods: {
    addData: (value: TableDataNoId) => void;
    removeData: (idList: string[]) => void;
    handleImportData: (e: any) => void;
    handleExportData: (e: any) => void;
  };
};
