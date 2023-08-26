import { TableData } from "../../Table/helpers";

// Types
export enum Mode {
  Display = "Display",
  Edit = "Edit",
}
export enum FocusInput {
  Filter = "Filter",
  Category = "Category",
  Tag = "Tag",
  Value = "Value",
}

export type TableDataNoId = Omit<TableData, "id">;

// Reducer types
export type TableStore = {
  tableData: TableData[];
  selectedRows: string[];
  mode: Mode;
  focusInput: FocusInput;
};

export enum TableReducerActionType {
  SET_FOCUS = "SET_FOCUS",
  SET_MODE = "SET_MODE",
}

type SetModeActionType = {
  type: TableReducerActionType.SET_MODE;
  payload: Mode;
};

type SetFocusActionType = {
  type: TableReducerActionType.SET_FOCUS;
  payload: FocusInput;
};

export type TableReducerAction = SetModeActionType | SetFocusActionType;
