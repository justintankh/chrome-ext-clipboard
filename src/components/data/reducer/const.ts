import { FocusInput, Mode, TableStore } from "./types";

export const initialState: TableStore = {
  tableData: [],
  selectedRows: [],
  mode: Mode.Display,
  focusInput: FocusInput.Filter,
};
