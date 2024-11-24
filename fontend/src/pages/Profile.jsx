import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
  // Adjust the path to match your project structure

const Profile = () => {
  const { authUser, updateProfile ,getProfile } = useAuthStore();
  const [userData, setUserData] = useState({
    profilePicture: authUser?.profilePicture || null,
    expertise: authUser?.expertise || "",
    about: authUser?.about || "",
    gender: authUser?.gender || "",
  });

  


  const [imageFile, setImageFile] = useState(null); 
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUserData({ ...userData, profilePicture: imageUrl });
      setImageFile(file); // Store the file to send to the server
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

    // Create form data to handle file uploads
    const formData = new FormData();
    formData.append("profilePicture", imageFile);
    formData.append("expertise", userData.expertise);
    formData.append("about", userData.about);
    formData.append("gender", userData.gender);

    try {
      await updateProfile(formData); // Call the updateProfile action
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <div className="space-y-2">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <label className="relative w-32 h-32 rounded-full overflow-hidden shadow-md bg-gray-100 cursor-pointer">
              {userData?.profilePicture ? (
                <img
                  src={userData?.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <span>Upload Image</span>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Name (Non-editable) */}
          <div>
            <span className="block text-sm font-medium text-gray-600">
              Name
            </span>
            <input
              type="text"
              value={authUser?.name || "John Doe"}
              disabled
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Gender */}
          <div>
            <span className="block text-sm font-medium text-gray-600">
              Gender
            </span>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleUserDataChange}
              className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Expertise */}
          <div>
            <span className="block text-sm font-medium text-gray-600">
              Expertise
            </span>
            <input
              type="text"
              name="expertise"
              value={userData.expertise}
              onChange={handleUserDataChange}
              placeholder="Enter your expertise"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* About/Info */}
          <div>
            <span className="block text-sm font-medium text-gray-600">
              About/Info
            </span>
            <textarea
              name="about"
              value={userData.about}
              onChange={handleUserDataChange}
              placeholder="Tell us about yourself"
              rows={3}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSubmit}
            className="w-full px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

 