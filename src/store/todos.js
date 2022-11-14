import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const todos = createSlice({
  name: "todos",
  initialState: {
    "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d": {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      title: "hello world",
      is_checked: false,
      created_date: 1668422024295,
      updated_date: null,
    },
    "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb62": {
      id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb62",
      title: "hello world, 22312",
      is_checked: true,
      created_date: 1668422024295,
      updated_date: null,
    },
  },
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: uuid(),
        title: action.payload,
        created_date: Date.now(),
        updated_date: null,
      };

      state[todo.id] = todo;
    },
    removeTodo: (state, action) => {
      delete state[action.payload];
    },
  },
});

export const { addTodo, removeTodo } = todos.actions;

export default todos.reducer;
