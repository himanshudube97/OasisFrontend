/* eslint-disable react/prop-types */
import { useState } from "react";
import { useBlogsStore } from "../../Zustand/store";

export const CommentBox = ({ blogId }) => {
  const { createComment } = useBlogsStore((state) => ({
    ...state,
  }));
  const [commentData, setCommentData] = useState("");
  const handleCommentSubmit = async () => {
    await createComment(blogId, { comment: commentData });
    setCommentData("");
  };

  return (
    <>
      <div className="flex flex-col gap-10 ">
        <div>
          <textarea
            required
            value={commentData}
            onChange={(e) => {
              setCommentData(e.target.value);
            }}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 resize-none mr-4"
            placeholder="Add a comment..."
            rows="10"
          ></textarea>
          <button
            onClick={() => {
              handleCommentSubmit();
            }}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Comment
          </button>
        </div>
      </div>
    </>
  );
};
