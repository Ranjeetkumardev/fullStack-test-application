import React from "react";

const AboutUs = () => {
  return (
    <div   className="h-full  bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col items-center px-6 py-10">
      <div className="max-w-4xl container   text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          About <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-lg text-gray-600 leading-8">
          Welcome to <strong>[Your Company Name]</strong>, where innovation
          meets excellence! We are a passionate team dedicated to creating
          solutions that inspire and empower. Since our inception in{" "}
          <strong>[Year]</strong>, we’ve been committed to making a difference
          and transforming lives through [your focus/service].
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-5xl w-full">
        {/* Who We Are */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600">
            A team of dedicated professionals driven by a shared vision to
            innovate and excel in everything we do.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To deliver exceptional [products/services] that empower communities
            and bring people closer to what matters.
          </p>
        </div>

        {/* Our Values */}
        <div className="bg-white p-6 shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Our Values
          </h2>
          <p className="text-gray-600">
            Integrity, innovation, and excellence are at the heart of
            everything we do.
          </p>
        </div>
      </div>

      <div className="mt-10 max-w-5xl w-full text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 leading-8">
          We prioritize your satisfaction and strive to exceed expectations.
          With a focus on quality, creativity, and customer care, we are here to
          make a meaningful impact.
        </p>
      </div>

      <div className="mt-10">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-700 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
