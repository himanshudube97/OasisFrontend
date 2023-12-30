import { useState } from "react";
import { useBlogsStore } from "../Zustand/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const navigate = useNavigate();
  const { createBlog } = useBlogsStore((state) => ({ ...state }));
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    const res = await createBlog(blogData);

    if (!res) {
      toast.success("Blog Successfully Created");
      navigate("/home");
    } else {
      toast.error(res);
      setBlogData({
        title: "",
        description: "",
        content: "",
      });
    }
  };
  return (
    <>
      <div className="py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Create a Blog</h1>
        <form className="max-w-xl mx-auto">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter title"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={blogData.description}
              onChange={handleInputChange}
              required
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 resize-none"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 font-bold mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={blogData.content}
              onChange={handleInputChange}
              required
              placeholder="Enter content"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 resize-none"
              rows="8"
            ></textarea>
          </div>
          <div>
            <button
              onClick={handleSubmitBlog}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
