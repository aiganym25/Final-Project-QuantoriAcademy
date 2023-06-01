import { createSlice } from "@reduxjs/toolkit";

interface RequestURLState {
  requestUrl: string;
  nextDataUrl: string;
}
const initialState: RequestURLState = {
  requestUrl:
    "https://rest.uniprot.org/uniprotkb/search?fields=accession,id,gene_names,organism_name,length,cc_subcellular_location&query=*",
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
