import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const notes = createSlice({
  name: "notes",
  initialState: {
    "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d": {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      title: "hello world",
      description: "hello world321321",
      is_checked: false,
      created_date: 1668422024295,
      updated_date: null,
    },
    "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb62": {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb62",
      title: "hello world, 22312",
      description: "hello world321321",
      is_checked: true,
      created_date: 1668422024295,
      updated_date: null,
    },
  },
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
  },
});

export const { addNote, removeNote } = notes.actions;

export default notes.reducer;
