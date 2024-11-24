import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuthStore } from "../store/useAuthStore";
 

const HomePage = () => {
  const { authUser} = useAuthStore();
  const images = [
    "url('/social-message.jpeg')",
    "url('/laptop.jpeg')",
    "url('/girl.png')",
    "url('/monitor.jpeg')",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      id="home"
      className="h-screen  w-full flex flex-col justify-center bg-cover bg-center   duration-1000"
      style={{ backgroundImage: images[currentImageIndex] }}
    >
      {/* Top overlay with opacity */}
      <div className="absolute inset-0  bg-black bg-opacity-70  z-10"></div>
     
      <div className="container mx-auto max-w-5xl">
        {/* Main Content */}
        <div className=" relative z-20  px-4 md:px-0  mt-40">
          <h1 className="text-4xl md:text-5xl font-bold text-white max-w-lg ">
            Connect to the Worl at  One Click
          </h1>
          <p className="mt-4 text-lg text-white max-w-xl">
            Unleash your brand's charisma online with revolutionary designs
            crafted in the heart of India. It's time to shine!
          </p>
          <Link to={authUser ? "/home" : "/login"}>
            <button className="w-full lg:w-44 mt-6 px-6 py-3 bg-white text-black text-lg font-semibold rounded-md shadow-md hover:bg-gray-200">
              Let's Connect
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
