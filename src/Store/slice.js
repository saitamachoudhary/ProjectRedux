import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

export const TodoSlice=createSlice({
    name:'Todo',
    initialState:{
        items:[
            {id:nanoid(),type:"Type1",childrens:[
                // {id:nanoid(),title:"Task1",message:"Do task"},
                // {id:nanoid(),title:"Task2",message:"Do task"},
            ]},
            {id:nanoid(),type:"Type2",childrens:[]},
            {id:nanoid(),type:"Type3",childrens:[]},
        ]
    },
    reducers:{
        addTodo:(state,action)=>{
          state.items.map((item)=>{
            (item.type===action.payload.type)?item.childrens.push({id:action.payload.id,title:action.payload.title,message:action.payload.message})
          :null})
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
    }
})

export const {addTodo,deleteTodo}=TodoSlice.actions;
export default TodoSlice.reducer;