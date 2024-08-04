/* eslint-disable react/prop-types */
// Navbar.js

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import { useAuthStore } from "../../Zustand/store";

const Navbar = ({ socket }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logoutUser, userData } = useAuthStore((state) => {
    return { ...state };
  });
  const [notification, setNotification] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    logoutUser();
    socket?.disconnect("disconnect");
  };

  useEffect(() => {
    if (socket) {
      socket.on("pvt-message", (msg) => {
        console.log(msg, "header main msg");
          if(userData._id!==msg.fromId){
            setNotification(true);
          }
      });
    }
  }, [socket, userData]);

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
            {notification ? (
              <li className="nav-item text-red-500"> New Notification</li>
              ) : (
              <li className="nav-item text-white py-2 px-4 block "> No Notification</li>
            )}
            <li className="nav-item">
              <Link
                to="/"
                className="text-white hover:text-gray-300 hover:rounded-full hover:bg-slate-500 py-2 px-4 block"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="text-white hover:text-gray-300 hover:rounded-full hover:bg-slate-500 py-2 px-4 block"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="text-white hover:text-gray-300 hover:rounded-full hover:bg-red-600	 py-2 px-4 block"
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
