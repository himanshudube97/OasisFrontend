import { useEffect, useState } from "react";
import { useAuthStore } from "../Zustand/store";
// import { AllUsers } from "../components/HomePage/AllUsers";
// import { UserFollowersList } from "../constants/constants";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";

export const OtherUserProfile = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const { singleUser, getSingleUserOther } = useAuthStore((state) => {
    return { ...state };
  });
  console.log(singleUser, "singleuser");
  useEffect(() => {
    async function getSingleUserFn(userId) {
      await getSingleUserOther(userId);
    }
    setLoading(true);
    getSingleUserFn(userId);
    setLoading(false);
  }, [getSingleUserOther, userId]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="flex justify-evenly">
      <div></div>
      <div className="bg-white rounded-lg shadow-lg p-6">
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
          <h1 className="text-xl font-semibold">{singleUser?.name}</h1>
          <span className="text-gray-500">{singleUser?.title}</span>
          <p className="text-gray-600 mt-2">{singleUser?.bio}</p>
        </div>

        {/* Followers and Following */}
        <div className="flex justify-around mt-4">
          <div>
            <h3 className="font-semibold">Followers</h3>
            <p>{singleUser?.followers.length}</p>
          </div>
          <div>
            <h3 className="font-semibold">Following</h3>
            <p>{singleUser?.following.length}</p>
          </div>
        </div>

        {/* Other Info */}
        <div className="mt-6">
          <h3 className="font-semibold">About</h3>
          <p className="text-gray-600 mt-2">{singleUser?.about}</p>
          {/* Add other user information sections as needed */}
        </div>
        <Link to={`/single-chat/${singleUser?._id}/${singleUser?.name}`}>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Message
          </button>
        </Link>
      </div>
      <div>
        {/* <h1>Users You follow</h1> */}
        {/* <AllUsers whatToShow={UserFollowersList.FOLLOWINGS} /> */}
      </div>
    </div>
  );
};
