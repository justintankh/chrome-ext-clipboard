import { initialState } from "./const";
import {
  TableReducerAction as reducerAction,
  TableReducerActionType,
  TableStore,
} from "./types";
import { configureStore } from "@reduxjs/toolkit";

const tableReducer = (
  state: TableStore = initialState,
  action: reducerAction
): TableStore => {
  switch (action.type) {
    case TableReducerActionType.SET_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case TableReducerActionType.SET_FOCUS:
      return {
        ...state,
        focusInput: action.payload,
      };
    case TableReducerActionType.SET_CATEGORY:
      return {
        ...state,
        categories: action.payload,
      };
    case TableReducerActionType.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export const useTableStore = () =>
  configureStore<TableStore, reducerAction>({
    reducer: tableReducer,
    preloadedState: initialState,
  });
