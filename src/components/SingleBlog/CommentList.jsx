import { useEffect } from "react";
import { useAuthStore, useBlogsStore } from "../../Zustand/store";

// eslint-disable-next-line react/prop-types
export const CommentList = ({blogId}) => {
    const {userData} = useAuthStore(state => ({...state}))
  const { allComments, getAllComments } = useBlogsStore((state) => ({
    ...state,
  }));
console.log(allComments, "allcomennts")
  useEffect(() => {
    async function getAllCommnetsFunc() {
      await getAllComments(blogId);
    }
    getAllCommnetsFunc(blogId);
  }, [blogId, getAllComments]);
  return (
    <>
      <div className="border-t border-gray-300 pt-4 basis-[20%] overflow-y-auto max-h-[80vh]">
        {allComments.map((item, index) => (
          <div key={index} className="bg-gray-100 rounded-md p-3 mb-3">
            <p className="text-gray-700 mb-2">
              <span className="font-semibold text-blue-600">
                {item?.createdBy?.name || userData.name }
              </span>
              <br />
              {item.comment}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
