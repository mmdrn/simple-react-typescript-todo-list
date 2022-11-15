import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { CheckTodo } from "../types/checkTodo";

export const todos = createSlice({
  name: "todos",
  initialState: {},
  reducers: {
    addTodo: (state: any, action: PayloadAction<string>) => {
      const todo = {
        id: uuid(),
        title: action.payload,
        is_checked: false,
        created_date: Date.now(),
        updated_date: null,
      };

      state[todo.id] = todo;
    },
    removeTodo: (state: any, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
    checkTodo: (state: any, action: PayloadAction<CheckTodo>) => {
      state[action.payload.id].is_checked = action.payload.is_checked;
    },
  },
});

export const { addTodo, removeTodo, checkTodo } = todos.actions;

export default todos.reducer;
