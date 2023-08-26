import { initialState } from "./const";
import {
  TableReducerAction as reducerAction,
  TableReducerActionType,
  TableReducerState,
} from "./types";
import { configureStore } from "@reduxjs/toolkit";

const tableReducer = (
  state: TableReducerState = initialState,
  action: reducerAction
): TableReducerState => {
  switch (action.type) {
    case TableReducerActionType.ADD_ROW:
      return {
        ...state,
      };
    case TableReducerActionType.SET_SEARCH:
      return {
        ...state,
      };
    case TableReducerActionType.SET_SELECTED:
      return {
        ...state,
        selectedRows: action.payload,
      };
    case TableReducerActionType.SET_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
};

export const useTableStore = () =>
  configureStore<TableReducerState, reducerAction>({
    reducer: tableReducer,
    preloadedState: initialState,
  });
