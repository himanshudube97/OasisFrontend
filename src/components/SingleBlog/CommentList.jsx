import { useEffect, useMemo } from "react";
import { useAuthStore, useBlogsStore } from "../../Zustand/store";
import { CommentCard } from "./CommentCard";

// eslint-disable-next-line react/prop-types
export const CommentList = ({ blogId }) => {
  const { userData } = useAuthStore((state) => ({ ...state }));
  const { allComments, getAllComments } = useBlogsStore((state) => ({
    ...state,
  }));
  console.log(allComments, "allcomennts");
  useEffect(() => {
    async function getAllCommnetsFunc() {
      await getAllComments(blogId);
    }
    getAllCommnetsFunc(blogId);
  }, [blogId, getAllComments]);

  const MemoizedComments = useMemo(() => {
    return allComments.map((item, index) => (
      <CommentCard key={index} item={item} userData={userData} />
    ));
  }, [allComments, userData]);

  return (
    <>
      <div className="border-t border-gray-300 pt-4 basis-[20%] overflow-y-auto max-h-[80vh]">
        {MemoizedComments}
      </div>
    </>
  );
};
