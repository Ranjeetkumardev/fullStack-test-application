import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PostCollection = () => {
  const { authUser, isLoading, getProfile } = useAuthStore();

  // Fetch users on component mount
  useEffect(() => {
    getProfile();
  }, []);

  console.log(authUser);
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // Handle empty state
  if (!authUser.user || authUser.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No users found.
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="w-full  flex">
        {/* Profile Section */}
        <div className="hidden md:flex flex-col items-center min-h-screen w-full max-w-64 pt-10 border-r bg-white">
          <div className="w-32 h-32 rounded-full bg-gray-200   shadow-sm">
            <img
              src={authUser?.user?.profilePicture}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <div className="mt-6 text-gray-600 space-y-4 px-4">
            <p className="space-x-1">
            <span className="font-bold text-lg text-gray-800">
              Name :
              </span>
              <span className="  text-gray-800">
                {authUser?.user?.fullName || "N/A"}
              </span>
            </p>
            <p className="space-x-1">
            <span className="font-bold text-lg text-gray-800">
              Email :
              </span>
              <span className=" text-gray-800">
                {authUser?.user?.email || "N/A"}
              </span>
            </p>
            <p className="space-x-1 ">
            <span className="font-bold text-lg text-gray-800">
              Expertise :
              </span>
              <span className=" text-gray-800">
                {authUser.user?.expertise || "Engineer"}
              </span>
            </p>
            <Link to="/profile">
              <button className="w-full p-2 bg-indigo-600 mt-4 rounded-lg text-center text-white font-medium">
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((post, index) => (
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
