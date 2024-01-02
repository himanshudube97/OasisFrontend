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
    isPaid: false,
  });
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmitBlog = async (e) => {
    e.preventDefault();
    const {error} = await createBlog({...blogData, tags: tagList});

    if (!error) {
      toast.success("Blog Successfully Created");
      navigate("/home");
    } else {
      toast.error(error);
      setBlogData({
        title: "",
        description: "",
        content: "",
      });
    }
  };

  const handleRemoveTags = (index) => {
    console.log(index, "ind");
    setTagList((prev) => {
      return prev.filter((_, i) => {
        return i !== index;
      });
    });
  };
  console.log(blogData, "list");
  return (
    <>
      <div className="py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Create a Blog</h1>
        <form className="flex flex-wrap justify-between">
          {/* Left Section */}
          <div className="w-full lg:w-1/4 lg:pr-4 mb-4">
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
          </div>

          {/* Middle Section */}
          <div className="w-full lg:w-1/2 lg:px-4 mb-4">
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
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 resize-none over"
                rows="25"
              ></textarea>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/4 lg:pl-4 mb-4">
            <div className="mb-4">
              <label
                htmlFor="tags"
                className="block text-gray-700 font-bold mb-2"
              >
                Tags
              </label>
              <input
                id="tags"
                type="text"
                name="tags"
                onChange={(e) => {
                  setTag(e.target.value);
                }}
                // Add your tag-related state and handlers here
                value={tag}
                placeholder="Enter tags"
                className=" border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => {
                  setTagList((prev) => {
                    return [...prev, tag];
                  });
                  setTag("");
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add
              </button>

              <div>
                {tagList.map((tagItem, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-gray-200 text-gray-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
                  >
                    {tagItem}
                    <button
                      type="button"
                      onClick={() => {
                        handleRemoveTags(index);
                      }}
                      className="ml-2 focus:outline-none"
                    >
                      &#x2715;
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="paid"
                className="block text-gray-700 font-bold mb-2"
              >
                Paid
              </label>
              <input
                id="isPaid"
                type="checkbox"
                name="isPaid"
                checked={blogData.isPaid}
                onChange={(e) => {
                  setBlogData((prev) => {
                    return { ...prev, isPaid: e.target.checked };
                  });
                }}
                // Add your paid-related state and handlers here
                className="mr-2"
              />
              <span className="text-gray-700">Is Paid</span>
            </div>
            {/* Submit Button */}
            <div>
              <button
                onClick={handleSubmitBlog}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
