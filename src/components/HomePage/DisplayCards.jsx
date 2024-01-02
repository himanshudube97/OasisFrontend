
import { useBlogsStore } from "../../Zustand/store";
import { memo, useEffect, useMemo } from "react";
import Loader from "../Loader/Loader";
import { BlogCard } from "./BlogCard";

const MemoizedBlogCard = memo(BlogCard);

export const DisplayCards = () => {
  const { allBlogs, getAllBlogs, loading } = useBlogsStore(
    (state) => {
      return { ...state };
    }
  );
console.log("did  ru n iiii")
  useEffect(() => {
    async function getBlogs() {
      await getAllBlogs();
     
    }
    getBlogs();
  }, [getAllBlogs]);


  const MemoizedCard = useMemo(() => {
    return allBlogs?.map((item) => {
      return (
        <>
        
          <MemoizedBlogCard
            key={item._id}
            item={item}
          />
        </>
      );
    });
  }, [allBlogs]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {" "}
        {/* Adjust grid columns based on responsiveness */}
        {MemoizedCard}
      </div>
    </>
  );
};
