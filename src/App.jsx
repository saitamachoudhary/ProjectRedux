// import './App.css'
import { useState } from "react";
import ListContainerdiv from "./Components/ListContainerdiv";
import { useSelector,useDispatch} from "react-redux";
import Model from "./Components/Model";

function App() {
  const [Mopen, setMopen] = useState(false);
  const list = useSelector((state) => state.TodoReducer.items);
  const handleModel = () => {
    setMopen(!Mopen);
  };
  return (
    <div className="ParentComponent min-h-screen w-full flex flex-col items-center justify-center">
      <div className="sub-div flex flex-col items-center justify-center gap-3">
        <h1 className="text-5xl">Todo Lists</h1>
        <button
          className=" px-8 py-2 bg-blue-400 hover:bg-blue-500 text-white mb-2"
          onClick={handleModel}
        >
          Add Todo
        </button>
        {Mopen?<Model handleModel={handleModel}/>:null}
      </div>
      <div className="sub_div-container w-full h-[80vh] flex items-center justify-around">
        {list.map((item) => (
          <ListContainerdiv key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
