/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { deleteTodo } from "../Store/slice";
import { useDispatch } from "react-redux";
const ListContainerdiv = ({item}) => { 
    const dispatch=useDispatch();
    const handleDelete=(item,itemsID)=>{
        dispatch(deleteTodo({type:item.type,id:itemsID}))
    }
  return (
    <div className="flex flex-col gap-3 p-3 border-solid border-2 bg-gray-200 h-full w-[300px]">
        {item.childrens&&item.childrens.map((items)=>{
            return (
                <div className="flex items-center justify-between border-solid border-2 border-gray-50 w-full p-2 hover:bg-[#60A5FA] hover:text-white cursor-pointer" key={item.id} >
                    <div>
                    <h1 className="text-2xl">{items.title}</h1>
                    <p>{items.message}</p>
                    </div>
                    <MdDelete onClick={()=>handleDelete(item,items.id)} />
                </div>
            )
        })}
    </div>
  )
};

export default ListContainerdiv;
