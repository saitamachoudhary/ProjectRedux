/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { deleteTodo } from "../Store/slice";
import { addTodo } from "../Store/slice";
import { useDispatch} from "react-redux";
import { useState} from "react";
import { useDrag,useDrop} from "react-dnd";
const ListContainerdiv = ({ item,type}) => {
  const [dragID, setdragID] = useState(null);
  const dispatch = useDispatch();
  const handleDelete = (item, itemsID) => {
    dispatch(deleteTodo({ type: item.type, id: itemsID }));
  };
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {id:dragID},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop,] = useDrop(() => ({
    accept: 'div',
    drop: (item) => console.log(item,type),
    collect: (monitor) => ({
        isOver: !!monitor.isOver(), 
    }),
}))
  return (
    <div ref={drop} className="flex flex-col gap-3 p-3 border-solid border-2 bg-gray-200 h-full w-[300px]">
      {item.childrens &&
        item.childrens.map((items) => {  
          return (
            <div
              ref={drag}
              onMouseEnter={() => {
                setdragID(items.id);
              }}
            //   onMouseLeave={() => {
            //     setdragID(null);
            //   }}
              className="flex items-center justify-between border-solid border-2 border-gray-50 w-full p-2 hover:bg-[#60A5FA] hover:text-white cursor-pointer"
              key={items.id}
            >
              <div>
                <h1 className="text-2xl">{items.title}</h1>
                <p>{items.message}</p>
              </div>
              <MdDelete onClick={() => handleDelete(item, items.id)} />
            </div>
          );
        })}
    </div>
  );
};

// const ListContainerdiv = () => {
//     const [dragID, setdragID] = useState(null);
//     const dispatch = useDispatch();
//     const handleDelete = (item, itemsID) => {
//       dispatch(deleteTodo({ type: item.type, id: itemsID }));
//     };
//     const list = useSelector((state) => state.TodoReducer.items);
//     const [{ isDragging }, drag] = useDrag(() => ({
//       type: "div",
//       item: {id:dragID,list},
//       collect: (monitor) => ({
//         isDragging: !!monitor.isDragging(), 
//       }),
//     }));
  
//     const [{ isOver }, drop] = useDrop(() => ({
//       accept: 'div',
//       drop: (item) => console.log(item),
//       collect: (monitor) => ({
//           isOver: !!monitor.isOver(),
//       }),
//   }))
//     return (
//        <div className="sub_div-container w-full h-[80vh] flex items-center justify-around">
//        {list.map((item) => (
//          <div ref={drop} key={item.id} className="flex flex-col gap-3 p-3 border-solid border-2 bg-gray-200 h-full w-[300px]">
//          {item.childrens &&
//            item.childrens.map((items) => {
//              return (
//                <div
//                  ref={drag}
//                  onMouseEnter={() => {
//                    setdragID(items.id);
//                  }}
//                //   onMouseLeave={() => {
//                //     setdragID(null);
//                //   }}
//                  className="flex items-center justify-between border-solid border-2 border-gray-50 w-full p-2 hover:bg-[#60A5FA] hover:text-white cursor-pointer"
//                  key={items.id}
//                >
//                  <div>
//                    <h1 className="text-2xl">{items.title}</h1>
//                    <p>{items.message}</p>
//                  </div>
//                  <MdDelete onClick={() => handleDelete(item, items.id)} />
//                </div>
//              );
//            })}
//        </div>
//        ))}
//      </div>
//     );
//   };



// const ListContainerdiv = ({ item }) => {
//   const [dragID, setdragID] = useState(null);
//   const dispatch = useDispatch();

//   // Create a ref for the drop target div
//   const dropTargetRef = useRef(null);

//   const handleDelete = (item, itemsID) => {
//     dispatch(deleteTodo({ type: item.type, id: itemsID }));
//   };

//   const [{ isDragging }, drag] = useDrag(() => ({
//     type: "div",
//     item: { id: dragID, item },
//     collect: (monitor) => ({
//       isDragging: !!monitor.isDragging(),
//     }),
//   }));

//   const [{ isOver }, drop] = useDrop(() => ({
//     accept: "div",
//     drop: (item) => {
//       if (dropTargetRef.current) {
//         // Access the target element via the ref
//         const targetElement = dropTargetRef.current;
//         const targetClassName = targetElement.className;

//         console.log("Dropped Item:", item);
//         console.log("Drop Target Class:", targetClassName);
//       }
//       return item;
//     },
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={dropTargetRef} // Attach the ref to the drop target div
//       className="flex flex-col gap-3 p-3 border-solid border-2 bg-gray-200 h-full w-[300px]"
//     >
//       {item.childrens &&
//         item.childrens.map((items) => {
//           return (
//             <div
//               ref={drag}
//               onMouseEnter={() => {
//                 setdragID(items.id);
//               }}
//               className="flex items-center justify-between border-solid border-2 border-gray-50 w-full p-2 hover:bg-[#60A5FA] hover:text-white cursor-pointer"
//               key={items.id}
//             >
//               <div>
//                 <h1 className="text-2xl">{items.title}</h1>
//                 <p>{items.message}</p>
//               </div>
//               <MdDelete onClick={() => handleDelete(item, items.id)} />
//             </div>
//           );
//         })}
//     </div>
//   );
// };




export default ListContainerdiv;
