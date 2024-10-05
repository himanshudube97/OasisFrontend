/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Like } from "./Like";
import { format, parseISO } from 'date-fns';

const BlogCard = ({ item }) => {
  
  const formattedDate = format(parseISO(item.createdAt), 'dd/MM/yyyy');
   
  return (
    <>
      <Link to={`/single-blog/${item._id}`}>
        <div
          key={item._id}
          className="bg-white rounded shadow p-4 transition duration-300 ease-in-out transform hover:scale-105 "
        >
          <h2 className="text-lg  font-semibold mb-2 truncate">{item.title}</h2>
          <p className="text-sm mb-2">
            Created by {item.createdBy.name} on {formattedDate}
          </p>
          <p className="text-sm mb-4 overflow-hidden h-24">
            {item.description}
          </p>
          <Like item={item} />

          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Comment
          </button>
        </div>
      </Link>
    </>
  );
};


export default BlogCard;