import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    books: []
  },
  reducers: {
      getBook: (state, action) => {
        state.books = action.payload
      }
  },
});

export const { getBook } = bookSlice.actions;
export default bookSlice.reducer;
