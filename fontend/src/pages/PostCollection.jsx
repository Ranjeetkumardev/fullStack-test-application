import React from "react";
import { Link } from "react-router-dom";

const PostCollection = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="w-full  flex">
        {/* Profile Section */}
        <div className="hidden md:flex flex-col items-center min-h-screen w-full max-w-64 pt-10 border-r bg-white">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden shadow-md">
            <p className="text-gray-500 flex items-center justify-center h-full">
              Profile Picture
            </p>
          </div>

          <div className="mt-6 text-gray-600 space-y-4 px-4">
            <p className="text-sm font-medium">
              User Name
              <span className="font-bold text-lg text-gray-800">John Doe</span>
            </p>
            <p className="text-sm font-medium">
              User Email
              <span className="font-bold text-lg text-gray-800">
                johndoe@example.com
              </span>
            </p>
            <p className="text-sm font-medium">
              Total Posts:{" "}
              <span className="font-bold text-lg text-gray-800">12</span>
            </p>
            <Link to={"/profile"}>
            <button className="w-full p-2 bg-indigo-600 rounded-lg text-center text-white font-medium">
              Update Profile 
            </button>
            </Link>
          </div>
        </div>

        {/* Post Section */}
        <div className="flex-1 p-6 overflow-y-auto h-screen">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Posts</h1>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Sample Post Card */}
            {[1, 2, 3, 4].map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <div className="h-32 bg-gray-200 rounded-md"></div>
                <h2 className="mt-4 text-lg font-semibold text-gray-800">
                  Post Title {post}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCollection;
