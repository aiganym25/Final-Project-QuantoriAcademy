import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";

interface Protein {
  key: number;
  primaryAccession: string;
  uniProtkbId: string;
  genes: string;
  organism: string;
  locations: string;
  length: number;
}

interface TableDataState {
  status: string;
  data: Protein[];
  lastKey: number;
  linkHeader: string;
}

const initialState: TableDataState = {
  status: "",
  data: [],
  lastKey: 0,
  linkHeader: "",
};

export const fetchProteins = createAsyncThunk("search", async (api: string) => {
  const response = await fetch(api);
  return response.json();
  // return response;
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
              key: state.lastKey + index + 1,
              primaryAccession: result.primaryAccession,
              uniProtkbId: result.uniProtkbId,
              genes: genes,
              organism: organism,
              locations: locations,
              length: length,
            };
          }
        );

        state.data = [...state.data, ...newEntities];
        state.lastKey = state.lastKey + newEntities.length;
        state.status = "idle";
      })
      .addCase(fetchProteins.rejected, (state) => {
        state.status = "failed";
        message.error("Error occurred while fetching the data");
      });
  },
  reducers: {
    setTableData: (state, action) => {
      state.data = [];
      state.data = action.payload;
    },
  },
});
export const { setTableData } = TableDataSlice.actions;
export default TableDataSlice.reducer;
