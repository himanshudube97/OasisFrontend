import { useEffect, useState } from "react";
import { useAuthStore } from "../Zustand/store";
import editComp from "../assets/icons/edit-solid.svg";
import { EditDiv } from "../components/ProfileComps/EditDiv";
import { AllUsers } from "../components/HomePage/AllUsers";
import { UserFollowersList } from "../constants/constants";
export const UserProfile = () => {
  const { userData, isUpdating } = useAuthStore((state) => {
    return { ...state };
  });
  const [editId, setEditId] = useState("");
  const handleEditButton = (e) => {
    setEditId(e.target.id);
  };
  useEffect(()=>{
    if(!isUpdating){
        console.log(isUpdating)
        setEditId("")
    }
  },[isUpdating])
  return (
    <div className="flex justify-evenly">
      <div>

      </div>
      <div className=" bg-white rounded-lg shadow-lg p-6">
        {/* Avatar */}
        <div className="flex items-center justify-center">
          <img
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        {/* User Info */}
        <div className="text-center mt-4">
          {editId == "name" ? (
            <EditDiv width={50} val={userData?.name} editId={editId} />
          ) : (
            <h1 className="text-xl font-semibold">
              {userData?.name}{" "}
              <img
                id="name"
                className="inline-block"
                onClick={handleEditButton}
                src={editComp}
              />{" "}
            </h1>
          )}
          {editId == "title" ? (
            <EditDiv width={50} val={userData.title} editId={editId} />
          ) : (
            <span className="text-gray-500">
              {userData?.title}
              <img
                id="title"
                className="inline-block"
                src={editComp}
                onClick={handleEditButton}
              />{" "}
            </span>
          )}

          {editId == "bio" ? (
            <EditDiv width={50} val={userData.bio} editId={editId} />
          ) : (
            <p className="text-gray-600 mt-2">
              {userData?.bio}
              <img
                id="bio"
                className="inline-block"
                src={editComp}
                onClick={handleEditButton}
              />
            </p>
          )}
        </div>

        {/* Followers and Following */}
        <div className="flex justify-around mt-4">
          <div>
            <h3 className="font-semibold">Followers</h3>
            <p>{userData.followers.length}</p>
          </div>
          <div>
            <h3 className="font-semibold">Following</h3>
            <p>{userData.following.length}</p>
          </div>
        </div>

        {/* Other Info */}
        <div className="mt-6">
          <h3 className="font-semibold">About</h3>
          {editId == "about" ? (
            <EditDiv width={100} val={userData.about} editId={editId} />
          ) : (
            <p className="text-gray-600 mt-2">
                {userData?.about}
              <img
                id="about"
                className="inline-block"
                src={editComp}
                onClick={handleEditButton}
              />
            </p>
          )}

          {/* Add other user information sections as needed */}
        </div>
      
      </div>
     <div>
            <h1>Users You follow</h1>
      <AllUsers whatToShow={UserFollowersList.FOLLOWINGS} />
     </div>
    </div>
  );
};
