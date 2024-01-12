/* eslint-disable react/prop-types */
// Navbar.js

import { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import { useAuthStore } from "../../Zustand/store";

const Navbar = ({socket}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutUser } = useAuthStore((state) => {
    return { ...state };
  });
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = ()=>{
    logoutUser();
    socket?.disconnect("disconnect");
  }
console.log(socket, "socketttttthead")
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">
          Oasis
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="block lg:hidden">
          <button
            onClick={toggleNavbar}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h18v1H3V5zm0 7h18v1H3v-1zm0 7h18v1H3v-1z"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`lg:flex ${isOpen ? "block" : "hidden"} items-center`}>
          <ul className="lg:flex flex-col lg:flex-row list-none lg:ml-auto ">
            <li className="nav-item">
              <Link
                to="/"
                className="text-white hover:text-gray-300 py-2 px-4 block"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="text-white hover:text-gray-300 py-2 px-4 block"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="bg-white hover:text-grey-300"
              >
                Logout
              </button>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
