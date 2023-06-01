import { createSlice } from "@reduxjs/toolkit";

interface TableDataState {
  totalDataCount: number;
}

const initialState: TableDataState = {
  totalDataCount: 0,
};

export const TableDataSlice = createSlice({
  name: "tableData",
  initialState,
  reducers: {
    setTotalDataCount: (state, action) => {
      state.totalDataCount = action.payload;
    },
  },
});
export const { setTotalDataCount } = TableDataSlice.actions;
export default TableDataSlice.reducer;
