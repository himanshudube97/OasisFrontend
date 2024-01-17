/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { memo } from "react";
import { Link } from "react-router-dom";

export const CommentCard = memo(({item, userData}) => {
  return (
    <>
      <div className="bg-gray-100 rounded-md p-3 mb-3">
        <p className="text-gray-700 mb-2">
          <Link
            to={
              item?.createdBy?.name == userData.name || !item?.createdBy?.name
                ? "/profile"
                : ""
            }
          >
            <span className="font-semibold text-blue-600">
              {item?.createdBy?.name || userData.name}
            </span>
          </Link>
          <br />
          {item.comment}
        </p>
      </div>
    </>
  );
});
