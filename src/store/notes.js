import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const notes = createSlice({
  name: "notes",
  initialState: {},
  reducers: {
    addNote: (state, action) => {
      const note = {
        id: uuid(),
        title: action.payload.title,
        description: action.payload.description,
        created_date: Date.now(),
        updated_date: null,
      };

      state[note.id] = note;
    },
    removeNote: (state, action) => {
      delete state[action.payload];
    },
    updateNote: (state, action) => {
      const note = state[action.payload.id];
      note.updated_date = Date.now();
      note.title = action.payload.title;
      note.description = action.payload.description;
    },
  },
});

export const { addNote, removeNote, updateNote } = notes.actions;

export default notes.reducer;
