import { createSlice } from "@reduxjs/toolkit";

interface RequestURLState {
  requestUrl: string;
  nextDataUrl: string;
}
const initialState: RequestURLState = {
  requestUrl: "",
  nextDataUrl: "",
};
export const RequestURLSlice = createSlice({
  name: "requestUrl",
  initialState,
  reducers: {
    setRequestUrl: (state, action) => {
      state.requestUrl = action.payload;
    },
    setNextDataUrl: (state, action) => {
      state.requestUrl = action.payload;
    },
  },
});

export default RequestURLSlice.reducer;
export const { setRequestUrl, setNextDataUrl } = RequestURLSlice.actions;
