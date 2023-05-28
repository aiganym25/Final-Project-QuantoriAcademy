import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { SignUpSlice } from "./slices/signUpSlice";
import { ProteinDetailsSlice } from "./slices/proteinSlice";
import { SearchParamSlice } from "./slices/searchParamSLice";
import { TableDataSlice } from "./slices/tableDataslice";

export const store = configureStore({
  reducer: {
    signUp: SignUpSlice.reducer,
    proteinDetails: ProteinDetailsSlice.reducer,
    searchParam: SearchParamSlice.reducer,
    tableData: TableDataSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;

export type RootState = ReturnType<typeof store.getState>;
