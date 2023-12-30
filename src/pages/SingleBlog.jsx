import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBlogsStore } from "../Zustand/store";
import { Like } from "../components/HomePage/Like";
import { CommentList } from "../components/SingleBlog/CommentList";
import { CommentBox } from "../components/SingleBlog/CommentBox";

export const SingleBlog = () => {
  const { getSingleBlog, singleBlog } = useBlogsStore((state) => ({
    ...state,
  }));

  const { blogId } = useParams();

  useEffect(() => {
    async function getSingleBlogFunc() {
      await getSingleBlog(blogId);
    }
    getSingleBlogFunc();
  }, [blogId, getSingleBlog]);

  return (
    <>
      {singleBlog ? (
        <div className="py-8 px-4">
          <div className="flex justify-center gap-[5rem]">
            {/* Blog Title */}


            <CommentBox blogId={blogId} />
            <div className="basis-[50%]">
              <h1 className="text-3xl font-bold mb-4">{singleBlog?.title}</h1>

              {/* Blog Description */}
              <p className="text-gray-600 mb-6">{singleBlog?.description}</p>

              {/* Blog Content */}
              <p className="text-lg leading-relaxed mb-8">
                {singleBlog?.content}
              </p>
              <Like item={singleBlog} />
            </div>

            {/* Like Button */}
          

            {/* Comment Section */}

          

            <CommentList blogId={blogId} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
