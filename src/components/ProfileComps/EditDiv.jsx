import { useState } from "react";
import { useAuthStore } from "../../Zustand/store";

// eslint-disable-next-line react/prop-types
export const EditDiv = ({ width, val , editId }) => {
    const {updateUser} = useAuthStore(state => ({...state}));
    const[userInp, setUserInp] = useState(val);
    const handleInputChange = (e)=>{
        const {value} = e.target;
        setUserInp(value);
    }
    const handleUpdateUser = async()=>{
        const obj ={
            [editId]: userInp
        }
        await updateUser(obj);
    }

  return (
    <>
      <div>
        <input
          id={editId}
          type="text"
          name={editId}
          required
          value={userInp}
          onChange={handleInputChange}
          placeholder="Enter title"
          className={`w-[${width}%]  mx-auto border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:border-blue-500`}
        />
        <button onClick={handleUpdateUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
          Save
        </button>
      </div>
    </>
  );
};
