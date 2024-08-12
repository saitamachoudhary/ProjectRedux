import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

export const TodoSlice = createSlice({
  name: "Todo",
  initialState: {
    items: [
      {
        id: nanoid(),
        type: "Todo",
        childrens: [],
      },
      { id: nanoid(), type: "Progress", childrens: [] },
      {
        id: nanoid(),
        type: "Closed",
        childrens: [],
      },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      const { title, message, type } = action.payload;
      const todo = state.items.find((item) => item.type === type);
      todo.childrens.push({ id: nanoid(), title: title, message: message });
    },
    deleteTodo: (state, action) => {
      state.items.forEach((item) => {
        if (item.type === action.payload.type) {
          item.childrens = item.childrens.filter(
            (filteritem) => filteritem.id !== action.payload.id
          );
        }
      });
    },
    moveTodo: (state, action) => {
      const { sourceType, targetType, todoId } = action.payload;
      const source = state.items.find((item) => item.type === sourceType);
      const target = state.items.find((item) => item.type === targetType);
      const todo = source.childrens.find((item) => item.id === todoId);
      if (todo) {
        source.childrens = source.childrens.filter(
          (item) => item.id !== todoId
        );
        target.childrens.push(todo);
      }
    },
    reorderTodo: (state, action) => {
      const { sourceIndex, destinationIndex, type } = action.payload;
      const item = state.items.find(item => item.type === type);

      if (item && sourceIndex !== destinationIndex) {
        const temp = item.childrens[sourceIndex];
        item.childrens[sourceIndex] = item.childrens[destinationIndex];
        item.childrens[destinationIndex] = temp;
      }
    },
  },
});

export const { addTodo, deleteTodo, reorderTodo, moveTodo } = TodoSlice.actions;
export default TodoSlice.reducer;
