import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

const LandingHomePage = () => {
  
 
  const { allUsers, isLoading, getAllusers } = useAuthStore();

  // Fetch users on component mount
  useEffect(() => {
    getAllusers();  
  }, [getAllusers]);
  
  
  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  // Handle empty state
  if (!allUsers.users || allUsers.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No users found.
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="w-full flex flex-col ">
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto my-2 px-4">
          {allUsers?.users?.map((card) => (
            <div key={card._id}>
              <Link to={"/collection"}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={card.profilePicture}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      {card.fullName}
                    </h2>
                    <p className="text-gray-600">{card.about}</p>
                    {/* <p className="text-gray-600">{card.expertise}</p> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingHomePage;
