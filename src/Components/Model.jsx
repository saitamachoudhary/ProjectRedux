import { useDispatch} from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTodo } from "../Store/slice";
import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
const Model = ({ handleModel }) => {
  const [Title, settitle] = useState("");
  const [Message, setmessage] = useState("");
  const [dropdownvalue, setdropdownvalue] = useState("Todo");
  const dispatch = useDispatch();
  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        id: nanoid(),
        title: Title,
        message: Message,
        type: dropdownvalue,
      })
    );
    settitle("");
    setmessage("");
    setdropdownvalue("");
  };
  return (
    <div className="absolute p-3 top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-blue-200 w-2/6 rounded-md">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl">Add Your Task</h3>
        <FaRegWindowClose
          className="hover:text-red-400 cursor-pointer"
          onClick={handleModel}
        />
      </div>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4" action="">
        <div className="">
          <label className="text-lg" htmlFor="">
            Title:
          </label>
          <input
            value={Title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
            className="h-10 w-full"
            type="text"
          />
        </div>
        <div className="">
          <label className="text-lg" htmlFor="">
            Message:
          </label>
          <input
            value={Message}
            onChange={(e) => {
              setmessage(e.target.value);
            }}
            className="h-10 w-full"
            type="text"
          />
        </div>
        <div>
          <label className="text-lg" htmlFor="">
            Select Type
          </label>
          <select
            value={dropdownvalue}
            onChange={(e) => {
              setdropdownvalue(e.target.value);
            }}
            className="h-10 w-full"
            name="Select"
            id=""
          >
            <option value="Todo">Todo</option>
            <option value="Progress">Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <button className="p-2 bg-white hover:bg-gray-300" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Model;
