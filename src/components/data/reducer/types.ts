import { TableData } from "../../Table/types";

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
  null = "null",
}

export type TableDataNoId = Omit<TableData, "id">;

// Reducer types
export type TableStore = {
  tableData: TableData[];
  mode: Mode;
  focusInput: FocusInput;
  categories: string[];
  filter: string[];
};

export enum TableReducerActionType {
  SET_FOCUS = "SET_FOCUS",
  SET_MODE = "SET_MODE",
  SET_CATEGORY = "SET_CATEGORY",
  SET_FILTER = "SET_FILTER",
}

type SetModeActionType = {
  type: TableReducerActionType.SET_MODE;
  payload: Mode;
};

type SetFocusActionType = {
  type: TableReducerActionType.SET_FOCUS;
  payload: FocusInput;
};

type SetCategoryActionType = {
  type: TableReducerActionType.SET_CATEGORY;
  payload: string[];
};

type SetCategoryFilterActionType = {
  type: TableReducerActionType.SET_FILTER;
  payload: string[];
};

export type TableReducerAction =
  | SetModeActionType
  | SetFocusActionType
  | SetCategoryActionType
  | SetCategoryFilterActionType;
