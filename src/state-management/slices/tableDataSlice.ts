import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

const initialState = {
  status: "",
  data: [
    {
      key: 0,
      primaryAccession: "",
      uniProtkbId: "string",
      genes: "",
      organism: "",
      locations: "",
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
      .addCase(fetchProteins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProteins.fulfilled, (state, action) => {
        // console.log(action.payload.results);
        const newEntities = action.payload.results.map(
          (
            result: {
              primaryAccession: string;
              uniProtkbId: string;
              genes?: {
                orfNames?: { value: string }[];
                geneName?: { value: string };
              }[];
              organism: { scientificName: string };
              sequence: { length: number };
              comments?: {
                subcellularLocations: { location: { value: string } }[];
              }[];
            },
            index: number
          ) => {
            let genes = "";
            if (result.genes) {
              if (result.genes[0]?.orfNames) {
                genes = result.genes
                  .map((gene) =>
                    gene.orfNames?.map((value) => value.value).join(", ")
                  )
                  .join(", ");
              } else if (result.genes[0]?.geneName) {
                genes = result.genes
                  .map((gene) => gene.geneName?.value)
                  .join(", ");
              }
            }
            const organism = result.organism.scientificName;
            const length = result.sequence.length;
            const locations = result.comments
              ?.map(
                (el: {
                  subcellularLocations: { location: { value: string } }[];
                }) =>
                  el.subcellularLocations.map(
                    (loc: { location: { value: string } }) => loc.location.value
                  )
              )
              ?.join(", ");

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
      .addCase(fetchProteins.rejected, (state) => {
        state.status = "failed";
        message.error("Error occured while fetching the data");
      });
  },
  reducers: {
    setSortedData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setSortedData } = TableDataSlice.actions;
export default TableDataSlice.reducer;
