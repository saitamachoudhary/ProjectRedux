/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import { addTodo, deleteTodo } from "../Store/slice";
import { useDispatch} from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { nanoid } from "@reduxjs/toolkit";

const Todolist = ({ item, type, index }) => {
  const dispatch = useDispatch();
  const handleDelete = (item, itemsID) => {
    dispatch(deleteTodo({ type: type,id: itemsID }));
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {type:type,item:item,deleteDragTodo:()=>{
      dispatch(deleteTodo({type:type,id:item.id}))
    }},
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

  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: ({item,deleteDragTodo}) => {
      console.log(item,deleteDragTodo);
      dispatch(addTodo({type:type,id:nanoid(),title:item.title,message:item.message}))
      deleteDragTodo()
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
