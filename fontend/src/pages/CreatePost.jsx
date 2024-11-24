import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const CreatePost = () => {
  const [userData, setUserData] = useState({
    title: "",
    description: "",
    images: [],
  });

  const { createPost, isLoading } = useAuthStore();
  // Handle image selection (multiple files)
  const handleImageChange = (e) => {
    const files = e.target.files; // Get the selected files
    if (files) {
      const imageArray = Array.from(files); // Convert FileList to an array
      setUserData({ ...userData, images: imageArray }); // Store the array of images
    }
  };

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPost(userData);
      console.log(response);
      setUserData({
        title: "",
        description: "",
        images: [],
      });
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <div className="space-y-2">
          {/* Image Upload */}
          <input type="file" multiple onChange={handleImageChange} />

          {/* Post Title */}
          <div>
            <span className="block text-sm font-medium text-gray-600">
              Title
            </span>
            <input
              type="text"
              name="title"
              value={userData.title}
              onChange={handleUserDataChange}
              placeholder="Enter your expertise"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Description */}
          <div>
            <span className="block text-sm font-medium text-gray-600">
              Description
            </span>
            <textarea
              name="description"
              value={userData.description}
              onChange={handleUserDataChange}
              placeholder="Write a unique description about the post"
              rows={3}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {isLoading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
