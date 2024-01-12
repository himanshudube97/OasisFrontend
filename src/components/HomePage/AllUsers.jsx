/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useAuthStore } from "../../Zustand/store";
import { UserCard } from "./UserCard";

export const AllUsers = ({whatToShow}) => {

  const { users, userData, getAllUsers } = useAuthStore((state) => ({
    ...state,
  }));

  useEffect(() => {
    async function getUsers() {
      await getAllUsers();
    }
    getUsers();
  }, [getAllUsers]);

  return (
    <>
      <div className="mx-auto basis-[20%]">
        <UserCard whatToShow={whatToShow} users={users} userData={userData} />
      </div>
    </>
  );
};

{
  /* <button
onClick={() => {
  handleFollowUnfollow(user._id, { isFollow: true });
}}
className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
>
Follow
</button> */
}
