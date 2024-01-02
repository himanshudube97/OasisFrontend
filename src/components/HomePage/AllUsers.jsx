import { useEffect } from "react";
import { useAuthStore } from "../../Zustand/store";

export const AllUsers = () => {
  const { users, userData, getAllUsers, followUnfollow } = useAuthStore(
    (state) => ({ ...state })
  );

  useEffect(() => {
    async function getUsers() {
      await getAllUsers();
    }
    getUsers();
  }, [getAllUsers]);

  const handleFollowUnfollow = (id, data) => {
    async function followUnfollowUser() {
      await followUnfollow(id, data);
    }
    followUnfollowUser();
  };
  return (
    <>
      <div className="mx-auto basis-[20%]">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mt-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500">Web Developer</p>
            </div>

            {userData.followers.includes(user._id) ||
            userData.following.includes(user._id) ? (
              <button
                onClick={() => {
                  handleFollowUnfollow(user._id, { isFollow: false });
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  handleFollowUnfollow(user._id, { isFollow: true });
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                Follow
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
