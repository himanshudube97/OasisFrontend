import { FollowUnfollowBtn } from "./FollowUnfollowButton";
import { UserFollowersList } from "../../constants/constants";
import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
export const UserCard = ({ whatToShow, users, userData }) => {
  return (
    <>
      {whatToShow === UserFollowersList.FOLLOWINGS && (
        <>
          {users.map((user) => {
            return (
              <>
                {userData.following.includes(user._id) && (
                  <>
                    <div
                      key={user._id}
                      className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mt-4"
                    >
                      <div>
                        <Link to={`/user-profile/${user._id}`}>
                          <h2 className="text-lg font-semibold">{user.name}</h2>
                        </Link>
                        <p className="text-gray-500">Web Developer</p>
                      </div>
                      {/* //follow btn */}
                      <FollowUnfollowBtn userId={user._id} hasRealtion={true} />
                    </div>
                  </>
                )}
              </>
            );
          })}
        </>
      )}

      {/* show users i dont follow */}

      {whatToShow === UserFollowersList.NOT_FOLLOWED && (
        <>
          {console.log("yoo")}
          {users.map((user) => {
            return (
              <>
                {userData.following.includes(user._id) ? (
                  ""
                ) : (
                  <>
                    <div
                      key={user._id}
                      className="flex items-center justify-between bg-white rounded-lg shadow-md p-4 mt-4"
                    >
                      <div>
                        <Link to={`/user-profile/${user._id}`}>
                          <h2 className="text-lg font-semibold">{user.name}</h2>
                        </Link>
                        <p className="text-gray-500">Web Developer</p>
                      </div>
                      {/* //follow btn */}
                      <FollowUnfollowBtn
                        userId={user._id}
                        hasRealtion={false}
                      />
                    </div>
                  </>
                )}
              </>
            );
          })}
        </>
      )}
    </>
  );
};
