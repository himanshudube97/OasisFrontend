/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { memo } from "react";
import { useAuthStore } from "../../Zustand/store"; // Replace with the actual path

export const SingleMsg = memo(({ item }) => {
  const { userData } = useAuthStore((state) => {
    return { ...state };
  });

  const isCurrentUser = item?.fromId === userData._id;

  return (
    <div
      className={`mb-4 ${
        isCurrentUser ? "bg-blue-100 text-right" : "bg-green-100 text-left"
      } px-6 py-2`}
    >
      <p
        className={`${
          isCurrentUser ? "font-bold text-red-500" : "font-bold text-blue-500"
        }`}
      >
        {item?.fromName}
      </p>
      <p>{item?.message}</p>
    </div>
  );
});
