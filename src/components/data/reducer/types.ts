import { TableData } from "../../Table/helpers";

export enum MODE {
  DISPLAY = "DISPLAY",
  EDIT = "EDIT",
}

export type TableReducerState = {
  tableData: TableData[];
  selectedRows: string[];
  mode: MODE;
  //   search: string;
  //   selected: number;
};

export enum TableReducerActionType {
  ADD_ROW = "ADD_ROW",
  REMOVE_ROW = "REMOVE_ROW",
  SET_SELECTED = "SET_SELECTED",
  SET_SEARCH = "SET_SEARCH",
  SET_MODE = "SET_MODE",
}

type AddRowActionType = {
  type: TableReducerActionType.ADD_ROW;
  payload: Omit<TableData, "id">;
};

type RemoveRowActionType = {
  type: TableReducerActionType.REMOVE_ROW;
  payload: TableData["id"];
};

type SetSelectedActionType = {
  type: TableReducerActionType.SET_SELECTED;
  payload: TableData["id"][];
};

type SetSearchActionType = {
  type: TableReducerActionType.SET_SEARCH;
  payload: string;
};

type SetModeActionType = {
  type: TableReducerActionType.SET_MODE;
  payload: MODE;
};

export type TableReducerAction =
  | AddRowActionType
  | RemoveRowActionType
  | SetSelectedActionType
  | SetSearchActionType
  | SetModeActionType;
