import { FocusInput, Mode, TableStore } from "./types";

export const initialState: TableStore = {
  tableData: [],
  mode: Mode.Display,
  focusInput: FocusInput.Filter,
  categories: [],
  filter: [],
};
