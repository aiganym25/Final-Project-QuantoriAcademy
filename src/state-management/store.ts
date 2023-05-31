import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { SignUpSlice } from "./slices/signUpSlice";
import { ProteinDetailsSlice } from "./slices/proteinSlice";
import { SearchParamSlice } from "./slices/searchParamSlice";
import { TableDataSlice } from "./slices/tableDataSlice";
import { RequestURLSlice } from "./slices/urlSlice";

export const store = configureStore({
  reducer: {
    signUp: SignUpSlice.reducer,
    proteinDetails: ProteinDetailsSlice.reducer,
    searchParam: SearchParamSlice.reducer,
    tableData: TableDataSlice.reducer,
    requestURL: RequestURLSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = () =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

export type RootState = ReturnType<typeof store.getState>;
