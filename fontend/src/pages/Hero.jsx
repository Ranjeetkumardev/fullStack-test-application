import React from "react";
import HomePage from "./HomePage";
import Help from "./Help";
import AboutUs from "./About";

const Hero = () => {
  return (
    <div className="flex flex-col  ">
      {/* Home Section */}
      <div
        id="home"
        className="relative h-screen   "
      >
        <HomePage />
      </div>

      {/* Help Section */}
      <div id="help" className="h-full   ">
        <Help />
      </div>
      {/* about page Section */}
      <div id="about" className="h-full   ">
        <AboutUs />
      </div>
    </div>
  );
};

export default Hero;



// import React from "react";
// import HomePage from "./HomePage";
// import Help from "./Help";

// const Hero = () => {
//   return (
//     <div className="flex flex-col ">
//       <div
//         id="home"
//         className="h-screen bg-blue-500 flex items-center justify-center"
//       >
//         <HomePage />
//       </div>
//       <div
//         id="help"
//         className="h-screen bg-green-500 flex items-center justify-center"
//       >
//         <Help/>
//       </div>
//     </div>
//   );
// };

// export default Hero;
