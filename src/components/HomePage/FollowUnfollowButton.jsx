import { useAuthStore } from "../../Zustand/store";

/* eslint-disable react/prop-types */
export const FollowUnfollowBtn = ({ userId, hasRealtion }) => {
  const { followUnfollow } = useAuthStore((state) => ({ ...state }));
  const handleFollowUnfollow = (id, data) => {
    async function followUnfollowUser() {
      await followUnfollow(id, data);
    }
    followUnfollowUser();
  };
  return (
    <>
      {hasRealtion ? (
        <button
          onClick={() => {
            handleFollowUnfollow(userId, { isFollow: false });
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={() => {
            handleFollowUnfollow(userId, { isFollow: true });
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Follow
        </button>
      )}
    </>
  );
};
