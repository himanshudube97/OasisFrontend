import { useEffect } from "react";
import { useBlogsStore } from "../../Zustand/store";
import { Like } from "../HomePage/Like";

// eslint-disable-next-line react/prop-types
export const MainBlogSection = ({ blogId }) => {
  const { getSingleBlog, singleBlog } = useBlogsStore((state) => ({
    ...state,
  }));

  useEffect(() => {
    async function getSingleBlogFunc() {
      await getSingleBlog(blogId);
    }
    getSingleBlogFunc();
  }, [blogId, getSingleBlog]);
  return (
    <>
      {singleBlog ? (
        <div className="basis-[50%]">
          <h1 className="text-3xl font-bold mb-4">{singleBlog?.title}</h1>

          {/* Blog Description */}
          <p className="text-gray-600 mb-6">{singleBlog?.description}</p>

          {/* Blog Content */}
          <p className="text-lg leading-relaxed mb-8">{singleBlog?.content}</p>
          <Like item={singleBlog} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
