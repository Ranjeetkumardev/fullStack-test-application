import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Loader2 } from "lucide-react";

const LandingHomePage = () => {
  
  const cards = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200",
      title: "Card Title 1",
      description:
        "This is a short description about the content of this card. It's engaging and to the point.",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200",
      title: "Card Title 2",
      description:
        "Explore more about the exciting features and details provided in this card.",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200",
      title: "Card Title 3",
      description:
        "Get to know more about the unique benefits and offerings mentioned here.",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300x200",
      title: "Card Title 3",
      description:
        "Get to know more about the unique benefits and offerings mentioned here.",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/300x200",
      title: "Card Title 3",
      description:
        "Get to know more about the unique benefits and offerings mentioned here.",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/300x200",
      title: "Card Title 3",
      description:
        "Get to know more about the unique benefits and offerings mentioned here.",
    },
    // Add more cards as needed
  ];
  const { allUsers, isLoading, getAllusers } = useAuthStore();

  // Fetch users on component mount
  useEffect(() => {
    getAllusers(); // Call the function to fetch users
  }, [getAllusers]);
  
  console.log(allUsers?.users)
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
