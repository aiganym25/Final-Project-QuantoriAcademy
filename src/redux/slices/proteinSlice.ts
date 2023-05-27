import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProteinDetailsState {
  length: number;
  lastUpdate: string;
  mass: number;
  checksum: number;
  value: string;
}

const initialState: ProteinDetailsState = {
  length: 0,
  lastUpdate: "",
  mass: 0,
  checksum: 0,
  value: "",
};

export const ProteinDetailsSlice = createSlice({
  name: "proteinDetails",
  initialState: initialState,
  reducers: {
    updateProteinDetails: (
      state,
      action: PayloadAction<ProteinDetailsState>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default ProteinDetailsSlice.reducer;
export const { updateProteinDetails } = ProteinDetailsSlice.actions;
