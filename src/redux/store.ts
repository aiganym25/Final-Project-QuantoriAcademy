import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { SignUpSlice } from "./slices/signUpSlice";
import { ProteinDetailsSlice } from "./slices/proteinSlice";

export const store = configureStore({
  reducer: {
    signUp: SignUpSlice.reducer,
    proteinDetails: ProteinDetailsSlice.reducer,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
