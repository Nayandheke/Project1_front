import { createSlice } from "@reduxjs/toolkit";
import { clearStorage, fromStorage, inStorage } from "../lib";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        value: JSON.parse(fromStorage("130book") || "{}"),
    },
    reducers: {
        setBook: (state, action) => {
            state.value = action.payload;
            inStorage("130book", JSON.stringify(action.payload), true);
        },
        clearBook: (state) => {
            state.value = {};
            clearStorage("130book");
        },
    },
});

export default bookSlice.reducer;
export const { setBook, clearBook } = bookSlice.actions;