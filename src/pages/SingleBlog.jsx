import { useParams } from "react-router-dom";

import { CommentList } from "../components/SingleBlog/CommentList";
import { MainBlogSection } from "../components/SingleBlog/MainBlogSection";
import { GeneralLeftDiv } from "../components/SingleBlog/BlogComment-MeaningDiv";

export const SingleBlog = () => {
  const { blogId } = useParams();

  return (
    <>
      <div className="py-8 px-4">
        <div className="flex justify-center gap-[5rem]">
          {/* Blog Title */}

          <GeneralLeftDiv blogId={blogId} />

          <MainBlogSection blogId={blogId} />

          <CommentList blogId={blogId} />
        </div>
      </div>
    </>
  );
};
