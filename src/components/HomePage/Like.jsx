import { useEffect, useState } from "react";
import { useAuthStore, useBlogsStore } from "../../Zustand/store";

/* eslint-disable react/prop-types */
export const Like = ({ item }) => {
  const { userData } = useAuthStore((state) => ({ ...state }));
  const { likeUnlikeBlog } = useBlogsStore((state) => {
    return { ...state };
  });
    // const isLiked = useMemo(() => {
    //     console.log("broo")
    //   return item.likes.includes(userData._id) ? true : false;
    // }, [item.likes, userData._id]);
  const [localLike, setLocalLike] = useState(null);

  const handleLikeUnlike = async (e, blogId, likeBlog) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalLike((prev) => {
        console.log(prev, "prev")
      return !prev;
    });
    const res = await likeUnlikeBlog(blogId, { likeBlog });
    if (res) {
      setLocalLike((prev) => {
        return !prev;
      });
    }
  };

  useEffect(() => {
    if (item.likes.includes(userData._id)) {
      setLocalLike(true);
    } else {
      setLocalLike(false);
    }
  }, [item.likes, userData._id])

  return (
    <>
      {localLike ? (
        <button
          onClick={(e) => {
            handleLikeUnlike(e, item._id, false);
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
        >
          Unlike
        </button>
      ) : (
        <button
          onClick={(e) => {
            handleLikeUnlike(e, item._id, true);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
        >
          Like
        </button>
      )}
    </>
  );
};
