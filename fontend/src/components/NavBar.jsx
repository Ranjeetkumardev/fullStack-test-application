import React from "react";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center px-8 pt-2 ">
      <a href="#home">
        <img
          src="/social-network-logo.svg"
          alt="logo"
          className="w-[70px] h-12 object-cover cursor-pointer brightness-125"
        />
      </a>
      <div className="flex gap-4">
        <a href="#help">
          <p className="px-2 py-1 cursor-pointer hover:bg-white text-gray-400 rounded">Help</p>
        </a>
        <a href="#about">
          <p className="px-2 py-1 cursor-pointer hover:bg-white text-gray-400 rounded">About us</p>
        </a>
      </div>
    </div>
  );
};

export default NavBar;

 