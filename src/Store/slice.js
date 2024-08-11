import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

export const TodoSlice = createSlice({
  name: 'Todo',
  initialState: {
    items: [
      {
        id: nanoid(), type: "Todo", childrens: []
      },
      { id: nanoid(), type: "Progress", childrens: [] },
      { id: nanoid(), type: "Closed", childrens: [
        { id: nanoid(), title: "Task1", message: "Do task" },
        { id: nanoid(), title: "Task2", message: "Do task" },
      ] },
    ]
  },
  reducers: {
    addTodo: (state, action) => {
      const{title,message,type}=action.payload;
      const todo=state.items.find(item=>item.type===type);
      todo.childrens.push({id:nanoid(),title,title,message:message})
      // state.items.map((item) => {
      //   (item.type === action.payload.type) ? item.childrens.push({ id: nanoid(), title: action.payload.title, message: action.payload.message })
      //     : null
      // })
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
      const source=state.items.find((item)=>item.type===sourceType);
      const target=state.items.find((item)=>item.type===targetType);
      const todo=source.childrens.find((item)=>item.id===todoId);
      if(todo){
        source.childrens=source.childrens.filter((item)=>item.id!==todoId);
        target.childrens.push(todo);
      }
    },
    reorderTodo: (state, action) => {
      const { sourceIndex, destinationIndex, type } = action.payload;
       console.log(sourceIndex,destinationIndex,type);
       state.items.map((item)=>{
        if(item.type===type){
          let swap=item.childrens[sourceIndex];
          item.childrens[sourceIndex]=item.childrens[destinationIndex];
          item.childrens[destinationIndex]=swap;
        }
       })
      // const item=state.items.find(item=>item.type===type);
      // const[moveTodo]=item.childrens.splice(sourceIndex,1);
      // item.childrens.splice(destinationIndex,0,moveTodo)
    }
  }
})

export const { addTodo, deleteTodo, reorderTodo, moveTodo } = TodoSlice.actions;
export default TodoSlice.reducer;