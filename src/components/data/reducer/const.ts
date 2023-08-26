import { MODE, TableReducerState } from "./types";

export const initialState: TableReducerState = {
  tableData: [],
  selectedRows: [],
  mode: MODE.DISPLAY,
};
