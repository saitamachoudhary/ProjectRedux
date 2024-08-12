/* eslint-disable react/prop-types */
import React from "react";
import { MdDelete } from "react-icons/md";
import { deleteTodo, reorderTodo, moveTodo } from "../Store/slice";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  TODO: "todo",
};

const Todolist = ({ item, type, index, moveItem }) => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  const handleDelete = (item, itemsID) => {
    dispatch(deleteTodo({ type: type, id: itemsID }));
  };
  const [, drop] = useDrop({
    accept: ItemTypes.TODO,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      console.log(clientOffset)
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [, drag] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: {
      type: type,
      id: item.id,
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  drag(drop(ref));
  return (
    <div
      ref={ref}
      className="border rounded p-2 mb-2 bg-gray-100 flex justify-between items-center"
      key={item.id}
    >
      <div>
        <h1 className="text-2xl">{item.title}</h1>
        <p>{item.message}</p>
      </div>
      <MdDelete onClick={() => handleDelete(item, item.id)} />
    </div>
  );
};

const ListContainerdiv = ({ type, item }) => {
  const dispatch = useDispatch();

  const [, ref] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: (item) => {
      if (item.type !== type) {
        dispatch(
          moveTodo({
            sourceType: item.type,
            targetType: type,
            todoId: item.id,
          })
        );
        item.type = type;
      }
    },
  }));
  const moveItem = (dragIndex, hoverIndex) => {
   
      // dispatch(
      //   reorderTodo({
      //     sourceIndex: dragIndex,
      //     destinationIndex: hoverIndex,
      //     type: type,
      //   })
      // );
    
  };

  return (
    <div ref={ref} className="border rounded p-4 w-1/3">
      <h1 className="font-bold text-lg mb-4">{type}</h1>
      {item.map((Todo, index) => (
        <Todolist
          key={Todo.id}
          index={index}
          item={Todo}
          type={type}
          moveItem={moveItem}
        />
      ))}
    </div>
  );
};

export default ListContainerdiv;
