/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"


export const HomeHeader = ({userName})=>{
    console.log("homeheader")
    return <>
    <div className="flex items-center justify-between mb-4">
        <Link to="/profile">  <h1 className="text-2xl font-bold">Welcome: {userName}</h1>
        </Link>
          <Link to="/create-blog">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Blog
            </button>
          </Link>
        </div>
    </>
}