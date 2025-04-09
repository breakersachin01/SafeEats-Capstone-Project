import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showForm, setShowForm] = useState(false);
  const [currentUserName, setCurrentUserName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("loggedInEmail");
    if (loggedInEmail) {
      const allUsers = JSON.parse(localStorage.getItem("user")) || [];
      const matchedUser = allUsers.find((user) => user.email === loggedInEmail);
      if (matchedUser) {
        setCurrentUserName(matchedUser.name);
      }
    }
  }, []);

  const handleUserIconClick = () => {
    setShowForm(!showForm);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInEmail");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between py-6 fixed w-full bg-black shadow-md px-6 z-10">
      <div className="flex items-center">
        <img
          src="SafeEats_logo.png"
          alt="SafeEats Logo"
          className="h-12 w-12 rounded-full border-2 border-red-500"
        />
        <span className="ml-3 text-2xl font-semibold text-white">
          SafeEats: Because Every Bite Matters!
        </span>
      </div>
      <div className="relative">
        <button
          className="text-gray-600 hover:text-red-500 focus:outline-none"
          onClick={handleUserIconClick}
        >
          <i className="cursor-pointer rounded-full bg-black text-2xl items-center border-1 border-red-400">
            🧑‍🍳
          </i>
        </button>
        {showForm && (
          <div className="absolute right-0 mt-2 w-30 bg-white rounded-lg shadow-lg p-4">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold text-xl mb-2 text-center">
                  {currentUserName || "User"}{" "}
                </label>
              </div>
              <button
                type="button"
                className="items-center w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;