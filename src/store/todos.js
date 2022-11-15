import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const todos = createSlice({
  name: "todos",
  initialState: {},
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: uuid(),
        title: action.payload,
        is_checked: false,
        created_date: Date.now(),
        updated_date: null,
      };

      state[todo.id] = todo;
    },
    removeTodo: (state, action) => {
      delete state[action.payload];
    },
    checkTodo: (state, action) => {
      state[action.payload.id].is_checked = action.payload.is_checked;
    },
  },
});

export const { addTodo, removeTodo, checkTodo } = todos.actions;

export default todos.reducer;
