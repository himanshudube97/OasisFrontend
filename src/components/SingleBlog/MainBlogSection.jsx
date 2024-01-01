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
          {singleBlog.tags.map((item, i) => {
            return (
              <span
                className="inline-flex items-center bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                key={i}
              >
                {item}
              </span>
            );
          })}
          <div className="bg-blue-200 text-black text-xl">
            {" "}
            By-{singleBlog.createdBy.name}
          </div>
          {/* Blog Description */}
          <p className="text-gray-600 mb-6">{singleBlog?.description}</p>

          {/* Blog Content */}
          <div className="overflow-y-scroll max-h-[90vh]">
            {singleBlog.isPaid ? (
              <>
                <p className="text-lg leading-relaxed mb-8">
                  {singleBlog?.content.substring(0, 500)}
                </p>
                <p className=" bg-gray-200 leading-relaxed opacity-75 blur-sm">
                  {singleBlog.content}
                </p>
              </>
            ) : (
              <p className="text-lg leading-relaxed mb-8">
                {singleBlog?.content}
              </p>
           )} 
          </div>
          <Like item={singleBlog} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
