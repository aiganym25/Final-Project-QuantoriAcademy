import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  status: "",
  data: [
    {
      key: 0,
      primaryAccession: "",
      uniProtkbId: "string",
      genes: [""],
      organism: "",
      locations: [""],
      length: 0,
    },
  ],
};
export const fetchProteins = createAsyncThunk("search", async (api: string) => {
  const response = await fetch(api);
  return response.json();
});

export const TableDataSlice = createSlice({
  name: "tableData",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProteins.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProteins.fulfilled, (state, action) => {
        const newEntities = action.payload.results.map(
          (result: any, index: number) => {
            const genes = result.genes
              .map((gene: any) => gene.geneName.value)
              .join(", ");
            const organism = result.organism.scientificName;
            const length = result.sequence.length;
            const locations = result.comments
              .map((el: any) =>
                el.subcellularLocations.map((loc: any) => loc.location.value)
              )
              .join(", ");

            return {
              key: index + 1,
              primaryAccession: result.primaryAccession,
              uniProtkbId: result.uniProtkbId,
              genes: genes,
              organism: organism,
              locations: locations,
              length: length,
            };
          }
        );

        state.data = newEntities;
        state.status = "idle";
      })
      .addCase(fetchProteins.rejected, (state, action) => {
        state.status = "failed";
        message.error("Error occured while fetching the data");
      });
  },
  reducers: {},
});

export default TableDataSlice.reducer;
