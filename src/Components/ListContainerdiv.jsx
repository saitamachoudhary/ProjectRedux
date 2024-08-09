/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { addTodo, deleteTodo } from "../Store/slice";
// import { addTodo } from "../Store/slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { nanoid } from "@reduxjs/toolkit";

const Todolist = ({ item, type, index }) => {

  const dispatch = useDispatch();
  const handleDelete = (item, itemsID) => {
    dispatch(deleteTodo({ type: item.type, id: itemsID }));
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {type:type,item:item},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div>
      <div
        ref={drag}
        className="flex items-center justify-between border-solid border-2 border-gray-50 w-full p-2 hover:bg-[#60A5FA] hover:text-white cursor-pointer"
        key={item.id}
      >
        <div>
          <h1 className="text-2xl">{item.title}</h1>
          <p>{item.message}</p>
        </div>
        <MdDelete onClick={() => handleDelete(item, item.id)} />
      </div>
    </div>
  );
};

const ListContainerdiv = ({ type,item }) => {
  // const [dragID, setdragID] = useState(null);
  const dispatch = useDispatch();
  // const item = useSelector(
  //   (state) =>
  //     state.TodoReducer.items.find((item) => item.type === type).childrens
  // );
  // console.log(item,type)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: ({item}) => {
      // console.log(item, type);
      dispatch(addTodo({type:type,id:nanoid(),title:item.title,message:item.message}))
      // dispatch(deleteTodo(item,item.id))
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="flex flex-col gap-3 p-3 border-solid border-2 bg-gray-200 h-full w-[300px]"
    >
      <div className="w-full bg-slate-300 p-2">
        <h1 className="text-xl text-center">{type}</h1>
      </div>
      {item.map((Todo, index) => (
        <Todolist key={Todo.id} index={index} item={Todo} type={type} />
      ))}
    </div>
  );
};

export default ListContainerdiv;
