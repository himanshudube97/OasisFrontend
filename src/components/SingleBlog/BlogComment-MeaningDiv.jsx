/* eslint-disable react/prop-types */
import { CommentBox } from "./CommentBox";
import { ViewMeaning } from "./ViewMeaning";

export const GeneralLeftDiv = ({blogId}) => {
  return (
    <>
      <div className="flex flex-col gap-[2rem] basis-[20%] mt-8">
        <CommentBox blogId={blogId} />
        <ViewMeaning />
      </div>
    </>
  );
};
