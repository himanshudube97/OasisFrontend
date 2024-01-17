import { useEffect, useState } from "react";
import { useBlogsStore } from "../../Zustand/store";
import { Like } from "../HomePage/Like";
import { SummarizeBlog } from "./SummarizeBlog";
import { summarizeText } from "../../hooks/helperFunctions";

// eslint-disable-next-line react/prop-types
export const MainBlogSection = ({ blogId }) => {
  const { getSingleBlog, singleBlog, selectWord, clearWord } = useBlogsStore(
    (state) => ({
      ...state,
    })
  );
  const [summary, setSummary] = useState(false);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getSingleBlogFunc() {
      await getSingleBlog(blogId);
    }
    getSingleBlogFunc();
    return () => {
      clearWord();
    };
  }, [blogId, getSingleBlog, clearWord]);

  const handleSelectWord = () => {
    const selectedWord = window.getSelection().toString().trim();
    selectWord(selectedWord);
  };
  const handleSummarize = async () => {
    const res = await summarizeText({ text: singleBlog.content });
    setSummary(res);
  };
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
          <div
            className="overflow-y-scroll max-h-[90vh]"
            onDoubleClick={handleSelectWord}
          >
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
          <button
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              handleSummarize();
            }}
          >
            Summarize Blog
          </button>

          {summary && <SummarizeBlog summary={summary} />}
        </div>
      ) : (
        ""
      )}
    </>
  );
};
