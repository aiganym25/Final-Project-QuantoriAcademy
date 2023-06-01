import { createSlice } from "@reduxjs/toolkit";

interface SearchParamState {
  searchQuery: string;
}

const initialState: SearchParamState = {
  searchQuery: "*",
};

export const SearchParamSlice = createSlice({
  name: "searchParam",
  initialState: initialState,
  reducers: {
    setSearchParamQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export default SearchParamSlice.reducer;
export const { setSearchParamQuery } = SearchParamSlice.actions;
