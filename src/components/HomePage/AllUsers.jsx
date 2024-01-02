import { useEffect } from "react";
import { useAuthStore } from "../../Zustand/store";

export const AllUsers = () => {
  const { users, getAllUsers } = useAuthStore((state) => ({ ...state }));
    useEffect(()=>{
        async function getUsers(){
        await getAllUsers();
        }
        getUsers();
    },[getAllUsers])
  return (
    <>
      <div className="mx-auto basis-[20%]">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mt-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500">Web Developer</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Follow
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
