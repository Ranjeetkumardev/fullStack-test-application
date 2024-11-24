import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const LandingNavBar = () => {
  const { logout  , authUser} = useAuthStore();
  return (
    <div className="min-h-12 w-full sticky top-0 z-10">
      <div className="flex justify-between items-center w-full px-4 py-1 bg-gradient-to-r from-blue-200 to-blue-400 ">
        {/* LOGO */}
        <div className="max-w-24 w-full">
          <Link to={authUser ? "/home" :"/"}>
            <img
              src="/social-network-logo.svg"
              alt="logo"
              className="w-16 h-10 object-cover cursor-pointer brightness-125"
            />
          </Link>
        </div>
        {/* Search */}
        <div className="max-w-lg w-full flex justify-start items-center ">
           <input type="text"  placeholder="Search" className="rounded-3xl p-1 pl-4 w-full border outline-none"/>
        </div>
        {/* Setings */}
        <div className="flex flex-row-reverse gap-2 max-w-sm w-full  px-2 py-1">
         <p className="hover:bg-gray-50 rounded-lg cursor-pointer  p-1.5" onClick={logout}>Logout</p>
         <Link to={"/createpost"}>
         <p className="hover:bg-gray-50 rounded-lg cursor-pointer  p-1.5">Create Posts</p>
         </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingNavBar;
