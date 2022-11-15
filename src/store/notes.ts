import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { AddNote } from "../types/addNote";
import { UpdateNote } from "../types/updateNote";

export const notes = createSlice({
  name: "notes",
  initialState: {},
  reducers: {
    addNote: (state: any, action: PayloadAction<AddNote>) => {
      const note = {
        id: uuid(),
        title: action.payload.title,
        description: action.payload.description,
        created_date: Date.now(),
        updated_date: null,
      };

      state[note.id] = note;
    },
    removeNote: (state: any, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    updateNote: (state: any, action: PayloadAction<UpdateNote>) => {
      const note = state[action.payload.id];
      note.updated_date = Date.now();
      note.title = action.payload.title;
      note.description = action.payload.description;
    },
  },
});

export const { addNote, removeNote, updateNote } = notes.actions;

export default notes.reducer;
